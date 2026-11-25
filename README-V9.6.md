# Portfolio V9.6 — project-page responsive correction

V9.5 Home is intentionally unchanged. The shared project layout now keeps the first image tied to a fraction of viewport height rather than a fixed 743px and scales both width and height of documentation frames uniformly. This avoids the short, cropped cover and disproportionate text/gallery offsets on other screens.

At 1440×1024 CSS px, the title starts at y=782, description at y=846 and first gallery image at y=1224, preserving the Figma baseline. At other browser heights those sections move together, with fixed Geist Mono text sizes and fixed 4px/35px sticky header. IRL Glitch keeps its existing gallery of fixed 220px photos; no homepage, project data, or media files were edited.

To update V9.5, copy the contents of the `projects` folder into your existing repo `projects`, then Commit → Push origin in GitHub Desktop. You do not need to replace assets. Reset Chrome/Brave zoom to 100% (Cmd+0) when comparing sites on different monitors; browsers remember zoom per domain.
