/**
 * Extract trait values
 */
export function getTraits(payload) {
    return payload?.traits.data.length > 0 ? payload?.traits.data[0] : null
}

/**
 * Scroll to top of page
 */
export function scrollToTop() {
  window.scrollTo(0, 0);
}