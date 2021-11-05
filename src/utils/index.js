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
 * Check if Build My Profile form data is empty
 *
 * @param type {String}
 * @param data {Object}
 */
export function isProfileFormDataEmpty(type, data) {

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

/**
 * Check if Build Get Started form data is empty
 *
 * @param myInterest {Object}
 */
export function isGetStartedFormDataEmpty(myInterest) {
  return myInterest.length;
}

/**
 * Check if Skill form data is empty
 *
 * @param data {Object}
 */
export function isSkillFormEmpty(data) {
  return data.length;
}

/**
 * Check if Address form data is empty
 *
 * @param data {Object}
 */
export function isAddressFormEmpty(data, basicInfo) {
  return (
    data?.city.length ||
    data?.stateCode.length ||
    data?.streetAddr1.length ||
    data?.streetAddr2.length ||
    data?.zip.length ||
    basicInfo?.country.length ||
    basicInfo?.description.length ||
    basicInfo?.title.length
  );
}

/**
 * Check if Contact form data is empty
 *
 * @param data {Object}
 */
export function isContactFormEmpty(data) {
  return (
    data?.city.length ||
    data?.country.length ||
    data?.state.length ||
    data?.timeZone.length ||
    data?.zip.length ||
    data?.workingHourEnd.length ||
    data?.workingHourStart.length ||
    data?.zip.length
  );
}