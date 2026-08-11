# SEO lockdown — remove ONLY when Niall says "we are launching"

The preview site is hidden from Google by three layers. All three must be
removed together on launch day, and none of them before:

1. `public/robots.txt` — `Disallow: /` (replace with an allow-all robots.txt + sitemap reference)
2. `index.html` — `<meta name="robots" content="noindex, nofollow" />` in the `<head>` (remove)
3. `vercel.json` — `X-Robots-Tag: noindex, nofollow` header on every route (remove the headers block)

At launch, also: generate and submit `sitemap.xml` to Search Console
(per docs/sitemap-plan.md), and verify the 301 redirects in `vercel.json`
against docs/benchmark.md — the `/product/valet-*` targets are a draft mapping
to be confirmed when the packages pages are built.
