# Portfolio V8.3 — Figma 8.2 home + C2F-inspired scroll

## Scope
- All existing V8 project HTML pages, images and videos copied unchanged from Portfolio_V8_Full_Website_FINAL.zip.
- Only `index.html`, `home.css`, `home.js` modified.
- `CodeExport_ProtV8.2.rtf` provides hover frames (`HomePage_HoverAboutV6`, `HomePage_AltBlockSelectionV6`, `HomePage_HoverMailV6`, `HomePage_HoverInstV6`). It does NOT contain a standalone latest default frame with real project metadata; existing V8 project data is preserved.
- Base 1440×1024, 35px top bar starting at y=4, Geist Mono 24/31 header and 12/16 table, 28px rows.
- New state: selected blocks white with bright green (#00FF15) text as in the 8.2 export; original-color preview blurred at 11.75px. No strokes.
- ABOUT hover is green; MAIL/INSTAGRAM keep the previously working red-hover interaction.
- Index sorts by YEAR descending on initial load. Equal years retain source order.
- CATEGORY, MEDIUM, CONTEXT, YEAR groups are fixed. INDEX name-list moves down in reaction to native page scroll with spring inertia. The implementation is an independently programmed approximation of the perceived C2F visual behavior; C2F's exact internal motion code was not available.
- Reduced-motion preference disables inertial animation.

## Tune scroll motion
Open `home.js`: change `SCROLL_DISTANCE`, `NAME_TRAVEL`, `SPRING_STIFFNESS`, `SPRING_DAMPING` (at the start). When increasing NAME_TRAVEL above 224, make sure names are not obscured near the bottom on smaller screens.

## Install GitHub Desktop
1. Back up your active repository folder (Repository > Show in Finder).
2. For ONLY the changed home page, extract `Portfolio_V8_3_Home_Patch.zip` and replace the three files `index.html`, `home.css`, `home.js` in the repository root.
3. If you need the entire site from this version, extract `Portfolio_V8_3_Full_Website.zip` and copy all extracted CONTENTS to the repository root, preserving `.git`.
4. Open GitHub Desktop; verify the Changes pane, commit and Push origin.
5. Reload GitHub Pages with Cmd+Shift+R.

Note: ABOUT and MAIL remain visual controls; no destinations were supplied. Instagram opens a new tab. This version does not change any project-page content.
