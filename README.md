# [PDF-LR-Annotator](https://robert-z-lehr.github.io/PDF-LR-Annotator/)

Browser-based PDF literature-review annotator with color-coded highlighting, interactive navigation, and customizable annotation categories.

## Proof of concept features

- Open a local PDF directly in the browser
- Seven editable literature-review categories
- Select the active category with number keys `1` through `7`
- Drag across PDF text to highlight it
- Optional two-click start/end selection mode
- Sticky interactive legend
- `Enter` jumps to the next highlight in the active category
- `Shift+Enter` jumps to the previous highlight in the active category
- Navigation wraps from last to first and first to last
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

The project now uses a modular source tree instead of inline JavaScript and CSS in `index.html`.

```text
index.html
src/
  app.js
  categories.js
  pdfjs.js
  state.js
  styles.css
  functions/
    applyCurrentSelection.js
    buildLegend.js
    caretAtPoint.js
    clearAnnotations.js
    clearClickStart.js
    createAnnotations.js
    exportAnnotations.js
    groupedRectsFromRange.js
    handleKeydown.js
    handleTwoClick.js
    initApp.js
    loadPdf.js
    navigateHighlight.js
    rebuildCategoryIndex.js
    removeAnnotation.js
    renderAnnotation.js
    renderDocument.js
    setSelectedCategory.js
    toast.js
    updateStatus.js
```

Each behavior is isolated into a small module so a human maintainer can locate and modify one responsibility without editing a monolithic HTML file.

### Highlight navigation index

The application maintains an in-memory `categoryIndex` map. After a highlight is added, deleted, or cleared, `rebuildCategoryIndex.js` rebuilds each category's ordered list of annotation IDs. Ordering is based on:

1. PDF page number
2. Vertical position on the page
3. Horizontal position on the page

This means navigation follows document order even if highlights were created out of order. `navigateHighlight.js` keeps the current annotation ID for each category and performs cyclic next/previous navigation.

## PDF handling

This POC uses Mozilla PDF.js. The selected PDF is read from the user's local file picker and passed into PDF.js in the browser. The app does not upload the PDF to a server.

PDF.js is currently loaded from cdnjs, so the POC needs internet access for the PDF.js library itself. A later version can vendor PDF.js inside the repository for fully offline use.

## Important POC limitations

- Highlights are an application overlay and are **not written back into the PDF file**.
- Annotation persistence is export-only. Reloading the page clears the in-memory highlights.
- Importing a prior JSON annotation file is not implemented yet.
- Highlight placement is stored as normalized page rectangles. It should remain aligned at the current rendering scale, but this is not yet a production-grade PDF annotation format.
- Scanned/image-only PDFs do not expose selectable text unless OCR text is already embedded in the PDF.
- Two-click selection currently requires both clicks to be on the same PDF page.
- The current UI renders all pages eagerly; very large PDFs may be slower than a production viewer with virtualized rendering.

## GitHub Pages

GitHub Pages can host this project because it is a static HTML/CSS/JavaScript application. Configure Pages to deploy from the repository's `main` branch/root if it is not already enabled.

## Next logical milestones

1. Import annotation JSON and persistent browser storage
2. Category counts and explicit previous/next controls
3. Undo/redo
4. Search and filter annotations
5. Add notes attached to highlights
6. Write standards-compliant PDF highlight annotations back into an exported PDF
7. Package the viewer as a browser extension or embeddable component

## License

No project license has been selected yet. Add one before inviting external contributions or presenting the repository as open source.