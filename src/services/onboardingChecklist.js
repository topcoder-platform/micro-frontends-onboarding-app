import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Get the onboarding checklist data to know completed steps
 */
export function getOnboardingChecklist(username) {
  return axios.get(`${config.API.V5}/members/${username}/traits?traitIds=onboarding_checklist`);
}
