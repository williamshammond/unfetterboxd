(() => {
  const EXTENSION_PREFIX = "[LBVR]";
  const RATING_BADGE_CLASS = "lbvr-rating-badge";
  const SCAN_DELAY_MS = 150;
  let scanTimeoutId = null;

  function log(...args) {
    console.log(EXTENSION_PREFIX, ...args);
  }

  function findFilmElements() {
    return Array.from(document.querySelectorAll(".film-poster"));
  }

  function extractRatingFromFilmElement(el) {
    const candidates = [
      el,
      el.querySelector(".frame"),
      el.querySelector("[data-original-title]"),
      el.querySelector("[title]"),
      el.querySelector("[aria-label]")
    ].filter(Boolean);

    for (const candidate of candidates) {
      const values = [
        candidate.getAttribute("data-original-title"),
        candidate.getAttribute("title"),
        candidate.getAttribute("aria-label")
      ].filter(Boolean);

      for (const value of values) {
        const rating = extractStars(value);

        if (rating) {
          return rating;
        }
      }
    }

    return null;
  }

  function extractStars(value) {
    const normalized = normalizeText(value);
    const match = normalized.match(/(?:^|\s)(★{1,5}½?|½)$/);

    return match ? match[1] : null;
  }

  function normalizeText(value) {
    return (value || "").replace(/\s+/g, " ").trim();
  }

  function renderStars(el, rating) {
    const existingBadge = getExistingBadge(el);

    if (existingBadge) {
      if (existingBadge.textContent !== rating) {
        existingBadge.textContent = rating;
        existingBadge.setAttribute("aria-label", `Your rating: ${rating}`);
        return true;
      }

      return false;
    }

    const badge = document.createElement("span");
    badge.className = RATING_BADGE_CLASS;
    badge.textContent = rating;
    badge.setAttribute("aria-label", `Your rating: ${rating}`);

    el.classList.add("lbvr-has-rating");
    el.after(badge);

    return true;
  }

  function getExistingBadge(el) {
    const nextElement = el.nextElementSibling;

    if (nextElement?.classList.contains(RATING_BADGE_CLASS)) {
      return nextElement;
    }

    return el.querySelector(`:scope > .${RATING_BADGE_CLASS}`);
  }

  function scanAndRender() {
    const filmElements = findFilmElements();
    let renderedCount = 0;

    filmElements.forEach((el) => {
      const rating = extractRatingFromFilmElement(el);

      if (rating && renderStars(el, rating)) {
        renderedCount += 1;
      }
    });

    log(`Rendered ratings for ${renderedCount} of ${filmElements.length} film posters`);
  }

  function scheduleScan() {
    window.clearTimeout(scanTimeoutId);
    scanTimeoutId = window.setTimeout(scanAndRender, SCAN_DELAY_MS);
  }

  scanAndRender();

  const observer = new MutationObserver((mutations) => {
    const hasRelevantChange = mutations.some((mutation) => {
      return Array.from(mutation.addedNodes).some((node) => {
        return node instanceof Element && !node.classList.contains(RATING_BADGE_CLASS);
      });
    });

    if (hasRelevantChange) {
      scheduleScan();
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();
