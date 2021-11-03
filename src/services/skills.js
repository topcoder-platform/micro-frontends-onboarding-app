/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Loads live skills
 */
export function getAllSkills() {
  return axios.get(`${config.API.V5}/skills?perPage=5000`);
}

/**
 * Loads member skills
 */
export function getMemberSkills(username) {
  return axios.get(`${config.API.V5}/members/${username}/skills`);
}

/**
 * Update member skills
 */
export function updateMySkills(username, skillIds) {
  let skills = {};
  skillIds.forEach(skillId => {
    skills[skillId] = { "hidden": false }
  });
  return axios.patch(`${config.API.V3}/members/${username}/skills`, {
      "param": {
        "skills": skills
      }
  });
}

