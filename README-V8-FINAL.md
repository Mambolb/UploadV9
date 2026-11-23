# Portfolio V8 — Figma ProtV8(1)

This version uses the NEW Figma `HomePage_DefaultV3` geometry, not the old V7 black 56px bio header.

Source: `CodeExport_ProtV8(1).rtf` and the screenshot of four Figma frames supplied on 18 November 2026. Desktop frame: 1440 x 1024 px.

## V8 header
White 32px top bar. Brand at x=0 width=524. ABOUT at x=524 width=132. MAIL at x=785 width=129. INSTAGRAM at x=1047 width=132. All Geist Mono 16/21, 600, black. MAIL/INSTAGRAM hover red (#FF0000) with no borders. Instagram opens the supplied Instagram account in a new tab.

Mail and About are visual controls only because the export does not provide an email address or About page behavior. Do not invent either destination.

## Index and hover
Five column widths: 524/261/262/262/131. Row height 28px. Black background, no border or alternating fills. INDEX label red, remaining labels white. Hovering any content row displays its project's colored, blurred preview and fills all linked/merged content cells white. The text on these cells is black with a blurred image; while directly hovering the project-name cell it switches to red text and an unblurred full-color preview (the supplied red-on-white state). Clicking a project opens its existing dedicated page. Sorting is preserved.

## Site files
The complete archive contains all eight existing project pages and unchanged source images/videos. No media recompression. This version changes only home files and project preview paths.

## Update with GitHub Desktop
1. Open GitHub Desktop and select the existing WebPrototypeUploadFolder repository.
2. Repository > Show in Finder. Make a backup copy first.
3. Extract `Portfolio_V8_Full_Website.zip`. Copy its **contents** into the existing repository folder, replacing old files. Do not replace or delete the `.git` directory.
4. In GitHub Desktop, inspect Changes; commit to main and Push origin.
5. Hard refresh the GitHub Pages URL (Cmd+Shift+R).

For a small update from V8 initial / V7.1, you may use `Portfolio_V8_GitHub_Update.zip` instead. It contains only index.html, home.css, home.js, and projects-data.js.
