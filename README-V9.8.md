# Portfolio V9.8 — proportional project media

This is a static GitHub Pages site based on the supplied V9.7 archive. V9.5 home, sorting, cursor previews, original assets, texts and project routes are unchanged. No repository history is included in the full ZIP.

## Changes
- `projects/project-v94.js`: one intrinsic aspect ratio for each image/video, with known source sizes before loading; the hero fits both the available height and width. No independent X/Y scaling. Media stays centered.
- The V9.7 75%-of-viewport desktop media width is now a maximum. Narrow windows use a continuous width function (no 900/901px jump); hero can become narrower to fit vertically.
- The reference title/description are y=782/846 at 1440×1024 except Who Am I, where the title can move earlier to show the description on load. Header stays 4px black + 35px white. Geist Mono CSS, fixed desktop font sizes and full-width title strips remain unchanged.
- Shahed hero keeps its explicitly calibrated crop (1440:743 frame, horizontal source translation and vertical focus), uniformly scaled. Other media uses contain, including all documentation. Oversized documentation frames are centered and fitted rather than clipped; their heights follow the originals, so exact Figma offsets/overlaps are not reproduced. Sequence and nonnegative reference gaps are retained.
- IRL Glitch retains 220px images, five-column desktop layout, hover behavior. Narrow titles can wrap without overlapping descriptions.
- Project CSS/JS query versions updated to 9.8. No homepage query changes.

## Verification
Pilot: The Time at 1440×1024, 1920×1080, 1280×800, 901×800, 900×800, 390×844. Then all 7 remaining project pages at the same 6 sizes (48 layout checks total). Checked centered stage, source aspect ratio, no unintended clipping by stage, no horizontal scroll, no hero/title/description overlap, documentation order, IRL gallery before title and sticky header at top/bottom. Screenshots reviewed at desktop sizes. The Time at 1440×1024: 1080×607.5 (16:9), title y=782; at 1920×1080: 1324.4×745 (16:9), title y=824. At 900 and 901 widths the hero widths are 675 and 675.75, respectively.

Limitations: Chromium navigation was blocked in the test environment. Tests used an inline HTML fixture with the same CSS and JS (original file names retained for dimension lookup), image previews for large sources and video posters. Google Fonts was unavailable in this offline fixture, so visual typography used the fallback font. Actual online font loading, playback, routing and Safari were not tested. No fresh Figma export was supplied, so exact pixel equivalence cannot be certified. The existing intentional Shahed crop remains; all other source photos are fitted rather than cropped. This is a desktop correction with narrow-screen smoke checks, not a separate mobile Figma redesign.

## Install
Use the small update ZIP if you already have V9.7: copy its `projects/` folder into the repository root, replacing matching files. Keep assets, home and `.git` untouched. Alternatively use the complete ZIP for local preview or a new repository. Do not place the outer ZIP folder inside the repo; index.html must remain at root. Commit and push via GitHub Desktop. Refresh with Cmd+Shift+R and use Cmd+0 for consistent browser zoom.
