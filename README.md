# [PDF-LR-Annotator](https://robert-z-lehr.github.io/PDF-LR-Annotator/)

Browser-based PDF literature-review annotator for applying a seven-color schema and navigating annotations quickly.

## Proof of concept features

- Open a local PDF directly in the browser
- Seven editable literature-review categories
- Apply highlights with number keys `1` through `7`
- Sticky interactive legend
- Repeated category navigation to jump through matching highlights
- Click a highlight to remove it
- Export annotations and category labels as JSON
- Static front end suitable for GitHub Pages

## Default seven-category schema

1. Background / Theory
2. Research Question / Hypothesis
3. Methodology
4. Results / Data
5. Analysis / Interpretation
6. Conclusion / Implications
7. Limitations / Future Work

The category names are editable in the interface.

## Architecture

This POC uses HTML, CSS, JavaScript, and Mozilla PDF.js. The selected PDF is read from the user's local file picker and passed into PDF.js in the browser. The app does not upload the PDF to a server.

PDF.js is loaded from cdnjs, so the current POC needs internet access for the PDF.js library itself. A later version can vendor PDF.js inside the repository for fully offline use.

## Important POC limitations

- Highlights are an application overlay and are **not written back into the PDF file**.
- Annotation persistence is export-only in v0.1. Reloading the page clears the in-memory highlights.
- Importing a prior JSON annotation file is not implemented yet.
- Highlight placement is stored as normalized page rectangles. It should remain aligned at the current rendering scale, but this is not yet a production-grade PDF annotation format.
- Scanned/image-only PDFs do not expose selectable text unless OCR text is already embedded in the PDF.
- The current UI renders all pages eagerly; very large PDFs may be slower than a production viewer with virtualized rendering.

## GitHub Pages

GitHub Pages can host this project because it is a static HTML/CSS/JavaScript application. Configure Pages to deploy from the repository's `main` branch/root if it is not already enabled.

## Next logical milestones

1. Import/export annotation JSON and persistent browser storage
2. Click-start / click-end selection mode
3. Category counts and previous/next controls
4. Undo/redo
5. Search and filter annotations
6. Add notes attached to highlights
7. Write standards-compliant PDF highlight annotations back into an exported PDF
8. Package the viewer as a browser extension or embeddable component

## License

No project license has been selected yet. Add one before inviting external contributions or presenting the repository as open source.
