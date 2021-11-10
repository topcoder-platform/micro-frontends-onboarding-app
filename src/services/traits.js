/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";
import { wrapV3 } from "utils/";

/**
 * Create New Traits
 */
export function createTraits(handle, data) {
  return axios.post(`${config.API.V3}/members/${handle}/traits`, wrapV3(data));
}

/**
 * Update existing traits
 */
export function updateTraits(handle, data) {
  return axios.put(`${config.API.V3}/members/${handle}/traits`, wrapV3(data));
}
