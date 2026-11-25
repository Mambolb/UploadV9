# Portfolio V9.5 — Responsive Typography and Galleries

Based on the complete V9.4 website, with all the same original media assets.

## Changes
- Removed transform:scale(viewportWidth/1440) from the homepage and every project page. Native CSS typography no longer changes between monitors.
- Homepage columns preserve the 1440px Figma proportions via percentages. 12px text, 28px rows and 24px header stay constant at desktop widths.
- Removed sort arrows from INDEX, CATEGORY, MEDIUM, and CONTEXT. Only YEAR displays an arrow. The other headings can still sort when clicked.
- All ABOUT / MAIL / INSTAGRAM hover labels are now #00FF15 (green) instead of red.
- Project page header retains 4px black gutter, 35px white header and the same × composition, with sticky scrolling.
- IRL Glitch photos stay 220px wide, with a maximum gallery width of 1180px centered on wider screens. Captions, spacing and ordering remain per Figma.
- All project images/videos retain their original source assets and horizontal composition adjusts to viewport width, while their vertical position and size no longer undergo full-frame scaling.
- All HTML cache query strings bumped to v=9.5.

## Notes
- At a reference width of 1440px all Figma positions remain the same.
- The high-level original project image layouts are still based on absolute Figma positions, not fully redesigned for phones. Narrow gallery widths wrap naturally; mobile-specific design can be built later.
- The 9.5 update-only ZIP includes only 4 code files + HTML files + this README, not media.

## Publishing using GitHub Desktop
1. Make a backup of the current repository directory.
2. Unzip the *update-only* file, copy its contents into the repository **root**, and allow replacements. Keep the existing `assets/` folder.
3. Commit to main; Push origin. GitHub Pages uses the same repository and URL.
4. Refresh with Cmd+Shift+R to bypass cached CSS/JS.
