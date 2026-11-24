# Komplexe Bilder — Figma-exact header correction

Only `projects/shahed.html`, `projects/shahed-v10.css` and `projects/shahed-v10.js` are included. Copy the `projects` folder into your existing portfolio repository and replace the same-named files. Keep the existing `/assets` files unchanged.

- Correct Geist Mono font on the sticky header (24px/31px weight 600 for the name).
- Correct cross's text bounding box and offset from Figma (48px/62px, y=-17px within the right 524px cell).
- The 4px black top strip remains attached to the sticky header when scrolling. No new black strip below the header.
- The hero starts at y=39 as specified in Figma; the existing crop correction is preserved.
- Updated latest Figma export: the 37px title bar is black with white text (Cell_01 overrides underlying white Rectangle).
- No homepage or other project pages are modified.

The header sticks to the TOP of the viewport, including its 4px black top band.
