# Portfolio V9.7 — centered project media

This update changes only the project page layout (`projects/*`). The V9.6 home index, filters, cursor previews, and project assets remain unchanged.

- Project hero and documentation images sit in a centered stage at 75% of viewport width (desktop), like the reference C2F project page.
- Header and title bar stay full-bleed; header remains sticky with its top 4px black gap.
- Images stay at their original quality. `object-fit: cover` retains image crop in Figma-composed hero blocks. Documentation has matching scaling on X/Y.
- Hero fills most of the initial viewport. On `whoami` the text is immediately visible as requested.
- IRL Glitch continues to have fixed-width 220px photographs.

## Install
Unzip the small update on top of your GitHub Desktop repository folder; replace `projects/*`, commit and push. No `assets/` or root `index.html` are changed.

## CSS/JS knobs
`projects/project-v94.js`: `width*0.75` sets the stage width; `HERO_GAP` sets the gap below the header; `vh-TITLE_HEIGHT-8` determines hero height for full-screen projects.
