# DDIA Flashcards

Chapter-by-chapter flashcards for *Designing Data-Intensive Applications* (1st edition), as a static site for GitHub Pages.

Built for phones. Two screens:

1. **Chapters** — tick chapters (or whole parts), set options (shuffle, unlearned only, answer first), then tap **Start**.
2. **Cards** — tap to flip; swipe right or tap **Got it**, swipe left or tap **Again** (re-queued a few cards later), or **Skip**. The back arrow (or your phone's back button) returns to chapters.

Keyboard on desktop: <kbd>Space</kbd> flip, <kbd>→</kbd>/<kbd>G</kbd> got it, <kbd>←</kbd>/<kbd>A</kbd> again, <kbd>S</kbd> skip, <kbd>Esc</kbd> back.
- Selection and progress are saved in your browser's localStorage.

## Adding cards

Edit `cards.js` and append `{ q: "...", a: "..." }` to a chapter's `cards` array. Answers support `**bold**` and `` `code` ``.

## Hosting

Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Install as an app (PWA)

- **Android (Chrome):** tap **Install app** on the chapters screen, or ⋮ menu → *Install app*.
- **iPhone (Safari):** Share → *Add to Home Screen*.

It opens full-screen and works offline. When you're online it picks up new cards automatically. If you change the list of app files, bump `CACHE` in `sw.js`.
