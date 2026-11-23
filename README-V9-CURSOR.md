# Portfolio V9 — Floating previews on cursor hover

## Changed from V8.3

- The 1440px Figma-based index, year-descending default sorting and its spring-driven name-column scroll are retained.
- Full-viewport hover backgrounds have been completely removed from `index.html` and `home.css`.
- Hovering a project name or any of its data cells shows a small artwork preview near the pointer. Preview switches with the active project; does not block pointer or clicks.
- Previews use existing, lightweight `assets/preview-*.webp` images; project detail media are not changed or recompressed.
- White highlighted groups with green lettering remain as in V8.3; no strokes.
- Preview position stays within the window and flips to the other side near the right or bottom edges.
- Touch pointers hide the floating preview; keyboard, sorting and project navigation remain available.
- Original interaction is an independently implemented approximation of the observable hover-preview behavior on https://sose26.bauhaus-typography.com/, not its source JavaScript.

## Adjustable parameters

`home.css`:
- `--cursor-preview-width: 320px`
- `--cursor-preview-max-height: 240px`

`home.js`:
- `PREVIEW_LERP=0.33` (use 1 for instantaneous pointer tracking)
- `PREVIEW_GAP_X=22` and `PREVIEW_GAP_Y=16`

## Installation

For a V8.3 repository, replace `index.html`, `home.js`, `home.css`, and `projects-data.js` with files from the patch ZIP. Keep `assets/` and `projects/` unchanged. Commit and push with GitHub Desktop. If using a different starting version, use the full ZIP instead.
