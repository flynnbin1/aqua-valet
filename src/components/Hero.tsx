import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { site } from "../lib/site";

gsap.registerPlugin(ScrollTrigger);

// Relative public paths so the built site also works opened from disk
// (vite.config base "./").
const VIDEO_SRC = "hero/hero-scrub.mp4";
const VIDEO_SRC_MOBILE = "hero/hero-scrub-mobile.mp4";
// Each video's own poster is its DIRTY first frame so the story opens dirty
// even before the file loads; the static fallback uses the clean final frame.
const POSTER_START = "hero/hero-scrub-poster-start.jpg";
const POSTER_START_MOBILE = "hero/hero-scrub-mobile-poster-start.jpg";
const POSTER = "hero/hero-scrub-poster.jpg";
const POSTER_WEBP = "hero/hero-scrub-poster.webp";
// Phones get a portrait frame — the 16:9 still crops down to an unreadable
// sliver of car on a tall screen.
const POSTER_MOBILE = "hero/hero-poster-portrait.jpg";
const POSTER_MOBILE_WEBP = "hero/hero-poster-portrait.webp";

/**
 * Scroll-scrubbed video hero.
 *
 * The hero pins for ~200vh and scroll position drives video.currentTime —
 * scrolling down advances the valet film frame by frame, scrolling up
 * reverses it. No autoplay, no loop. Both clips are encoded with a keyframe
 * every 4 frames so seeks resolve fast enough to feel scrubbed.
 *
 *  - desktop (≥768px): the landscape clip
 *  - mobile  (<768px): the portrait clip, shot for phone screens
 *  - static: prefers-reduced-motion, or a save-data / 2G connection —
 *    a still of the clean final frame, no video downloaded at all.
 */
type Mode = "desktop" | "mobile" | "static";

type NetworkInfo = { saveData?: boolean; effectiveType?: string };

function resolveMode(): Mode {
  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  const connection = (navigator as Navigator & { connection?: NetworkInfo })
    .connection;
  const constrained =
    connection?.saveData === true ||
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g";
  if (reducedMotion || constrained) return "static";
  return window.matchMedia("(min-width: 768px)").matches ? "desktop" : "mobile";
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const pendingSeek = useRef<number | null>(null);
  // Resolved synchronously (lazy initializer, runs once before first paint)
  // rather than defaulting to "desktop" and correcting in an effect — the
  // old default briefly rendered the desktop <video src> on every mobile
  // visit, kicking off a request for the much larger desktop file that
  // then had to be aborted once the real mode landed.
  const [mode, setMode] = useState<Mode>(resolveMode);

  useEffect(() => {
    const queries = [
      window.matchMedia("(min-width: 768px)"),
      window.matchMedia("(prefers-reduced-motion: reduce)"),
    ];
    const update = () => setMode(resolveMode());
    queries.forEach((q) => q.addEventListener("change", update));
    return () =>
      queries.forEach((q) => q.removeEventListener("change", update));
  }, []);

  useEffect(() => {
    if (mode === "static") return;

    const video = videoRef.current;
    if (!video) return;

    // iOS Safari (and some mobile browsers) won't reflect programmatic
    // currentTime seeks on a video that's never actually played — the
    // scrub silently does nothing, frozen on the poster. A muted,
    // playsInline video is allowed to autoplay, so priming with an
    // immediate play+pause "unlocks" seeking without the visitor ever
    // seeing it move.
    const primeVideo = () => {
      const playAttempt = video.play();
      if (playAttempt && typeof playAttempt.then === "function") {
        playAttempt.then(() => video.pause()).catch(() => {});
      }
    };
    if (video.readyState >= 2) {
      primeVideo();
    } else {
      video.addEventListener("loadeddata", primeVideo, { once: true });
    }

    // Coalesce seeks: while the decoder is mid-seek, remember only the
    // latest requested time and apply it when the current seek lands.
    const seekTo = (t: number) => {
      if (video.seeking) {
        pendingSeek.current = t;
      } else {
        pendingSeek.current = null;
        video.currentTime = t;
      }
    };
    const onSeeked = () => {
      if (pendingSeek.current !== null) {
        const t = pendingSeek.current;
        pendingSeek.current = null;
        video.currentTime = t;
      }
    };
    video.addEventListener("seeked", onSeeked);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        scrub: true,
        onUpdate: (self) => {
          if (video.duration) {
            seekTo(self.progress * Math.max(video.duration - 0.05, 0));
          }
          if (hintRef.current) {
            hintRef.current.style.opacity = self.progress > 0.02 ? "0" : "1";
          }
        },
      });

      // No loading screen in front of the hero — entrance plays immediately.
      gsap.fromTo(
        ".name-reveal",
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.1, ease: "power3.out", delay: 0.1 },
      );
      gsap.fromTo(
        ".blur-in",
        { opacity: 0, y: 20, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.9,
          ease: "power3.out",
          delay: 0.2,
          stagger: 0.1,
        },
      );
    }, sectionRef);

    return () => {
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", primeVideo);
      ctx.revert();
    };
  }, [mode]);

  return (
    <section
      ref={sectionRef}
      id="home"
      aria-label="Aqua Valet — premium valeting, Cork"
    >
      <div ref={pinRef} className="relative h-hero overflow-hidden bg-black">
        {/* Media sits BELOW the fixed header (md+) so the header never covers
            the car, and the crop is biased upward — the car's roof is at 20.5%
            of the frame and the tyres at 85.5%, so a centred crop on a short
            laptop window clips the roof.
            Offset matches the header's collapsed (scrolled) height, not its
            taller resting height with the info strip — the hero pins almost
            immediately on scroll, so the header is in its collapsed state for
            virtually the entire pinned scroll. A larger offset here left a
            permanent gap below the collapsed header once the info strip
            stopped being sticky. */}
        <div className="absolute inset-0 md:top-16">
        {mode !== "static" ? (
          <video
            ref={videoRef}
            // key forces a fresh element when swapping clips across the
            // breakpoint, so the browser doesn't keep the old buffered file
            key={mode}
            className="h-full w-full object-cover md:object-[center_60%]"
            src={mode === "mobile" ? VIDEO_SRC_MOBILE : VIDEO_SRC}
            poster={mode === "mobile" ? POSTER_START_MOBILE : POSTER_START}
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            tabIndex={-1}
          />
        ) : (
          <picture>
            <source
              type="image/webp"
              media="(min-width: 768px)"
              srcSet={POSTER_WEBP}
            />
            <source type="image/webp" srcSet={POSTER_MOBILE_WEBP} />
            <source media="(min-width: 768px)" srcSet={POSTER} />
            <img
              src={POSTER_MOBILE}
              alt="A gleaming black premium SUV in the Aqua Valet studio after a full deep clean"
              width={828}
              height={1792}
              className="h-full w-full object-cover md:object-[center_60%]"
            />
          </picture>
        )}
        </div>

        {/* Subtle dark overlay + bottom fade for text legibility */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30" aria-hidden="true" />
        {/* Phones: extra top-down scrim so the headline stays crisp over the
            brighter part of the frame */}
        <div
          className="absolute inset-x-0 top-0 h-2/3 bg-gradient-to-b from-ink/85 via-ink/35 to-transparent md:hidden"
          aria-hidden="true"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-ink to-transparent"
          aria-hidden="true"
        />

        {/* Content — no z-index: a stacking context here would trap the
            lockup's mix-blend-screen away from the video behind it; DOM
            order already paints this above the overlays. Left-aligned over
            the dark space per the vwash-ref-2 framing (structure only). */}
        {/* Phones: text at the top, buttons pinned low, so the car reads in
            the clear band between them rather than sitting behind the CTAs.
            md+ keeps the single centred stack. */}
        <div className="relative mx-auto flex h-full w-full max-w-[1320px] flex-col items-start justify-between px-6 pb-28 pt-32 text-left sm:px-6 md:justify-center md:pb-0 md:pt-24 lg:px-10">
          <div className="w-full">
            <p className="blur-in text-xs uppercase tracking-[0.3em] text-ink-muted">
              Premium Valeting — Cork
            </p>
            <h1 className="name-reveal font-display mt-5 max-w-3xl text-ink-text text-[2.6rem] font-extrabold leading-[0.95] tracking-tight sm:text-5xl md:mt-6 md:text-7xl lg:text-8xl">
              Your car, <em className="not-italic text-accent">restored</em>.
            </h1>
            <p className="blur-in mt-5 max-w-md text-balance text-base text-ink-muted md:mt-6">
              Deep-clean specialists for people who care about their car. Eight
              years in Cork. By appointment only.
            </p>
            <p className="blur-in mt-4 flex items-center gap-2 text-sm text-ink-muted">
              <span className="text-accent" aria-hidden="true">
                ★★★★★
              </span>
              <span>
                {site.rating} · {site.reviewCount} Google reviews
              </span>
            </p>
          </div>
          <div className="blur-in mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-4 md:mt-9">
            <a
              href="#book"
              className="rounded-full bg-ink-text px-7 py-3.5 text-center text-base font-medium text-ink ring-2 ring-transparent transition hover:bg-ink hover:text-ink-text hover:ring-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get a Photo Quote
            </a>
            <a
              href="#pricing"
              className="rounded-full border border-white/25 px-7 py-3.5 text-center text-base font-medium text-ink-text transition hover:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View Packages
            </a>
          </div>
        </div>

        {/* Scroll cue — fades out once scrubbing starts */}
        {mode !== "static" && (
          <div
            ref={hintRef}
            aria-hidden="true"
            className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-center transition-opacity duration-500"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-ink-muted">
              Scroll to reveal
            </p>
            <div className="mx-auto mt-3 h-10 w-px overflow-hidden bg-ink-stroke">
              <div className="animate-scroll-down h-full w-full bg-ink-text" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
