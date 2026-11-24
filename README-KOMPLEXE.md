# Komplexe Bilder — crop + sticky header update

Only the Komplexe Bilder page changes. Replace these files in the existing repository, keeping the existing assets folder and all other project files unchanged:

- `projects/shahed.html`
- `projects/shahed-v10.css`
- `projects/shahed-v10.js`

Changes:
- Adjusted the first image crop to the Figma screenshot with an approximately 278px leftward and 285px downward shift (1440px design coordinates).
- Kept original image proportions and 1440px artboard composition.
- The top bar with the author name and × now sticks to the viewport during scrolling. It is outside the scaled canvas so `position: sticky` works correctly.

Open the updated site through VS Code or push with GitHub Desktop (Commit → Push origin). Refresh with Cmd+Shift+R.
