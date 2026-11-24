# Three project pages — Figma CSS layout update

Updates only:
- projects/design-as-epistemic.html
- projects/enzyklopaedie.html
- projects/turbulent.html

Adds:
- projects/detail-figma-v1.css
- projects/detail-figma-v1.js

Home V9, projects/shahed.html and all other files are unchanged.

## Install to the existing V9 repo
Open GitHub Desktop → Repository → Show in Finder.
Copy the `projects/` folder from this update over the repository's `projects/` folder.
Approve replacements of the three named HTML files (do NOT delete other HTML files).
Commit to main → Push origin.

## Media
All image references use existing `../assets/` paths from Portfolio V9:
- design-hero-figma-frame.png (substitute: original Scan 30_noBackground.png was not included in provided media)
- design-1.png, design-2.png, design-3.png
- enzyklopaedie-poster.png
- turbulent-poster.png

The Figma export specifies 1440px wide artboards. The HTML scales the whole artboard uniformly for other screen widths.
The 4px black strip + 35px white header are sticky. The title remains at Y=782 and the description starts at Y=846.
