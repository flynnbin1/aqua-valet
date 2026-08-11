// Export the hero scrub videos as WebP frame sequences for the canvas
// scroll-scrub (scroll → drawImage of the nearest loaded frame). 72 frames
// per clip at native source resolution, q75 — measured at ~34 KB/frame
// mobile and ~47 KB/frame desktop, i.e. smaller in total than the source
// MP4s they replace. Zero-padded names so lexical sort = playback order.
//
// Re-run after replacing either source video: node scripts/gen-hero-frames.mjs
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";

const FRAME_COUNT = 72;

const JOBS = [
  {
    src: "public/hero/hero-scrub.mp4",
    out: "public/hero/frames-desktop",
    duration: 21.266016, // from ffprobe — keep in sync with the source file
    scale: "1536:854",
  },
  {
    src: "public/hero/hero-scrub-mobile.mp4",
    out: "public/hero/frames-mobile",
    duration: 19.208008,
    scale: "720:1296",
  },
];

for (const job of JOBS) {
  const outDir = join(process.cwd(), job.out);
  mkdirSync(outDir, { recursive: true });
  execFileSync(
    "ffmpeg",
    [
      "-v", "error",
      "-y",
      "-i", join(process.cwd(), job.src),
      "-vf", `fps=${FRAME_COUNT}/${job.duration},scale=${job.scale}`,
      "-frames:v", String(FRAME_COUNT),
      "-c:v", "libwebp",
      "-quality", "75",
      join(outDir, "frame-%03d.webp"),
    ],
    { stdio: "inherit" },
  );
  const written = readdirSync(outDir).filter((f) => f.endsWith(".webp"));
  console.log(`${job.out}: ${written.length} frames`);
  if (written.length !== FRAME_COUNT) {
    throw new Error(`expected ${FRAME_COUNT} frames, got ${written.length}`);
  }
}
