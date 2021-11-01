/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Get contact details
 */
export function getContactDetails(myusername) {
  return axios.get(`${config.API.V5}/members/${myusername}/traits?traitIds=connect_info,basic_info`);
}

/**
 * CreateContactDetails
 */
export function createContactDetails(myusername, contactDetails){
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": "Connect User Information",
    "traitId": "connect_info",
    "traits": {
      "traitId": "connect_info",
      "data": [contactDetails]
    }
  }]);
}

/**
 * updateContactDetails
 */
export function updateContactDetails(myusername, contactDetails){
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": "Connect User Information",
    "traitId": "connect_info",
    "traits": {
      "traitId": "connect_info",
      "data": [contactDetails]
    }
  }]);
}
