# Visible Ratings for Letterboxd

A small Chrome extension that shows existing Letterboxd ratings directly on list pages.

## Local Install

1. Open `chrome://extensions`.
2. Enable Developer mode.
3. Click Load unpacked.
4. Select this project folder.

## Package for Chrome Web Store

Create an upload ZIP from the extension runtime files:

```sh
zip -r unfetterboxd-0.1.0.zip manifest.json content.js content.css icons
```

Upload the ZIP in the Chrome Web Store Developer Dashboard.

## Privacy

This extension runs only on Letterboxd list pages. It reads rating information already present in the current page DOM and injects visible rating text locally. It does not collect, transmit, or store user data.
