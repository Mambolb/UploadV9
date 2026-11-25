# Portfolio V9.9 — Figma Scale

The latest Shahed MacBook prototype screenshot is the primary reference. Its title begins at approximately y=782 on the 1440-wide design; the description starts at y=846. Unlike a viewport-height-driven intro, this naturally reveals more text on taller screens.

## Changes
- Project intro geometry, header and title typography and description all share a single scale derived from 1440px design width. The black header gutter remains exactly 4 CSS px. Header and title bars span the viewport.
- On unusually wide/short screens only, scale is capped at (viewport height - 4)/815 so the title fits inside the initial viewport; hero is centered horizontally with black side fields. On a narrow mobile viewport (below 700px), header/title/body use a readable CSS fallback.
- Hero media use original figure x/y/width/height, including deliberate frame clipping at the header and title. Shahed retains the calibrated original photo crop: horizontal offset -278px, object-position center 30.13%. No Figma screenshot is used as site artwork.
- The first two Shahed description paragraphs are separated, as in the prototype; existing words and project data are unchanged.
- Documentation for Shahed and Design as Epistemic Instrument is full viewport width, native image aspect ratio, no crop, with nonnegative original inter-image gaps; first image starts at the scaled original position or below the description if needed. This intentionally replaces oversized/overlapping Figma documentation crops in favor of the requested uncropped full-width photographs. IRL gallery stays independent, with 220px thumbnails.
- Original images, videos, home page and all non-project code are unchanged. Video behavior, close link and Escape remain. Cache query strings updated to 9.9.

## Checks
- Shahed checked first at 1440x1024 (title y=782, desc y=846), 1440x900, 1920x1080, 1280x800, 2560x1080 and 390x844, then all seven remaining pages checked at the same sizes (48 layout checks total).
- Chromium checked header/hero/title alignment, title fit, no horizontal overflow, document photograph full width and intrinsic aspect, no overlap with text; sticky header on Shahed checked after scroll. IRL checked for horizontal overflow and no JS exceptions.
- Direct local browser navigation was blocked in the test environment. Tests used the same CSS/JS in standalone HTML with downsampled versions of the original images embedded, and posters for videos. The actual website uses untouched original assets. Geist Mono remote loading, actual video playback and live GitHub Pages deployment were not tested. The only supplied latest Figma screenshot is Shahed, so other projects use archived Figma coordinates and cannot be certified pixel-identical to current Figma.

## Install
Unzip the update package and copy its `projects/` directory into the existing repository root, replacing matching files. Do not replace `assets/`, `index.html` or `.git`. For a fresh local preview use the full ZIP. Commit and push to GitHub Pages only after local visual inspection. Refresh Cmd+Shift+R and reset zoom Cmd+0.
