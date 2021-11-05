/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

const TRAIT_BASIC_INFO = "basic_info";
const CATEGORY_NAME = "Basic Info";

/**
 * Loads my basic info (To get interests)
 */
export function getMyBasicInfo(myusername) {
  return axios.get(`${config.API.V5}/members/${myusername}/traits?traitIds=basic_info`);
}

/**
 * Add my interests
 */
export function addMyPrimaryInterests(myusername, interestsFlat){
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": CATEGORY_NAME,
    "traitId": TRAIT_BASIC_INFO,
    "traits": {
      "data": [{
        "primaryInterestInTopcoder": interestsFlat
      }]
    }
  }]);
}

/**
 * Update my interests
 */
export function updateMyPrimaryInterests(myusername, prevBasicInfo, interestsFlat){
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": CATEGORY_NAME,
    "traitId": TRAIT_BASIC_INFO,
    "traits": {
      "data": [{
        ...prevBasicInfo,
        "primaryInterestInTopcoder": interestsFlat
      }]
    }
  }]);
}

/**
 * Add my address, if the basicInfo not exists
 */
export function addMyAddress(myusername, address, country){
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": CATEGORY_NAME,
    "traitId": TRAIT_BASIC_INFO,
    "traits": {
      "data": [{
        "addresses": [address],
        country
      }]
    }
  }]);
}

/**
 * Update my address
 */
export function updateMyAddress(myusername, prevBasicInfo, address, country) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": CATEGORY_NAME,
    "traitId": TRAIT_BASIC_INFO,
    "traits": {
      "data": [{
        ...prevBasicInfo,
        "addresses": [address],
        country
      }]
    }
  }]);
}

/**
 * Add my title and bio, if the basicInfo not exists
 */
export function addMyTitleAndBio(myusername, data){
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": CATEGORY_NAME,
    "traitId": TRAIT_BASIC_INFO,
    "traits": {
      "data": [data]
    }
  }]);
}

/**
 * Update my title and bio
 */
export function updateMyTitleAndBio(myusername, prevBasicInfo, data) {
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": CATEGORY_NAME,
    "traitId": TRAIT_BASIC_INFO,
    "traits": {
      "data": [{
        ...prevBasicInfo,
        ...data
      }]
    }
  }]);
}
