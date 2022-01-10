import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

const TRAIT_ONBOARDING_CHECKLIST = "onboarding_checklist";
const CATEGORY_NAME = "Onboarding Checklist";

export async function getOnboardingChecklist(handle) {
  try {
    const response = await axios.get(
      `${config.API.V5}/members/${handle}/traits?traitIds=${TRAIT_ONBOARDING_CHECKLIST}`
    );

    return { data: response.data };
  } catch (err) {
    return { data: [] };
  }
}

export async function updateOnboardingWizardTraits(
  handle,
  updatedTraits,
  shouldCreate = false
) {
  const payload = {
    categoryName: CATEGORY_NAME,
    traitId: TRAIT_ONBOARDING_CHECKLIST,
    traits: {
      traitId: TRAIT_ONBOARDING_CHECKLIST,
      data: updatedTraits,
    },
  };

  if (shouldCreate) {
    return axios.post(`${config.API.V5}/members/${handle}/traits`, [payload]);
  } else {
    return axios.put(`${config.API.V5}/members/${handle}/traits`, [payload]);
  }
}
