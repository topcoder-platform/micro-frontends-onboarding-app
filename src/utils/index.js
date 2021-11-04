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

/**
 * Check if form data is empty
 *
 * @param type {String}
 * @param data {Object}
 */
export function isFormDataEmpty(type, data) {

  switch (type) {
    case "bio":
      return data?.title.length || data?.description.length
    case "work":
      return (
        data?.cityTown.length ||
        data?.company.length ||
        data?.position.length ||
        data?.timePeriodFrom.length ||
        data?.timePeriodTo.length
      );
    case "education":
      return (
        data?.major.length ||
        data?.schoolCollegeName.length ||
        data?.timePeriodFrom.length ||
        data?.timePeriodTo.length
      );
    case "language":
      return (
        data?.language.length ||
        data?.spokenLevel.length ||
        data?.writtenLevel.length
      );
  }
  return true;
}