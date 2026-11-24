# Komplexe Bilder — single-page Figma update

## Files changed
- `projects/shahed.html` — replaces only the Shahed / Komplexe Bilder dedicated page.
- `projects/shahed-v10.css` — new scoped stylesheet (not shared).
- `projects/shahed-v10.js` — new proportional resize behavior (not shared).

Keep the existing `assets/shahed-005.jpg`, `shahed-000.jpg`, `shahed-0000.jpg`, `shahed-006.jpg`, `shahed-002.jpg` and `shahed-001.jpg` files unchanged. Existing V8/V9 portfolio archives contain them. Homepage and other project pages remain untouched.

## Install
1. Open your GitHub Desktop repository in Finder.
2. Copy the `projects/` folder from this update into the repository root. Choose **Merge**, and replace `projects/shahed.html` when prompted.
3. Preview `projects/shahed.html` locally in a browser.
4. Commit in GitHub Desktop and push.

## Geometry
The original reference is 1440 × 7184 px. At other browser widths, the complete artboard is uniformly scaled in CSS pixels. The stage width is not stretched independently of its media.

Figma exported a 7346px black background behind a 7184px artboard; the visual page ends at 7184px. The portrait hero (`005`) is placed into a 1742×743px image-fill area with `object-fit: cover; object-position: center` because the supplied CSS does not specify a more precise image fill crop. Its exact crop may need comparison against the Figma screenshot.

The author's name in the description is reproduced literally from the supplied export (`Daerber`).
