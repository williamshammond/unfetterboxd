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

## Privacy Policy

**List Stars for Letterboxd** does not collect, sell, share, transmit, or store personal data externally.

The extension runs only on Letterboxd list pages. It reads star rating information already present in the current page DOM and displays it locally on the page.

The extension uses Chrome local storage only to remember the user’s show/hide preference.

No analytics, tracking, remote code, backend server, or external API is used.

This extension is independent and is not affiliated with Letterboxd.
