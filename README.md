# DDIA Flashcards

Chapter-by-chapter flashcards for *Designing Data-Intensive Applications* (1st edition), as a static site for GitHub Pages.

- Toggle chapters (or whole parts) on and off; the deck rebuilds from your selection.
- Flip with a click or <kbd>Space</kbd>; mark **Got it** (<kbd>→</kbd>/<kbd>G</kbd>), **Again** (<kbd>←</kbd>/<kbd>A</kbd>, re-queued a few cards later) or **Skip** (<kbd>S</kbd>).
- **Unlearned only** hides cards you've marked Got it; **Answer first** reverses the cards.
- Selection and progress are saved in your browser's localStorage.

## Adding cards

Edit `cards.js` and append `{ q: "...", a: "..." }` to a chapter's `cards` array. Answers support `**bold**` and `` `code` ``.

## Hosting

Settings → Pages → Deploy from a branch → `main` / `(root)`.
