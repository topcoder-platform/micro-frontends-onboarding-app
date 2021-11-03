/**
 * Topcoder Service
 */
import { axiosInstance as axios } from "./requestInterceptor";
import config from "../../config";

/**
 * Loads my basic info (To get interests)
 */
export function getMyBasicInfo(myusername) {
  return axios.get(`${config.API.V3}/members/${myusername}/traits?traitIds=basic_info`);
}

/**
 * Add my interests
 */
export function addMyPrimaryInterests(myusername, interestsFlat){
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": "Basic Info",
    "traitId": "basic_info",
    "traits": {
      "traitId": "basic_info",
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
    "categoryName": "Basic Info",
    "traitId": "basic_info",
    "traits": {
      "traitId": "basic_info",
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
    "categoryName": "Basic Info",
    "traitId": "basic_info",
    "traits": {
      "traitId": "basic_info",
      "data": [{
        "addresses": [address],
        "country": country
      }]
    }
  }]);
}

/**
 * Update my address
 */
export function updateMyAddress(myusername, prevBasicInfo, address, country){
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": "Basic Info",
    "traitId": "basic_info",
    "traits": {
      "traitId": "basic_info",
      "data": [{
        ...prevBasicInfo,
        "addresses": [address],
        "country": country
      }]
    }
  }]);
}

/**
 * Add my title and bio, if the basicInfo not exists
 */
export function addMyTitleAndBio(myusername, data){
  return axios.post(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": "Basic Info",
    "traitId": "basic_info",
    "traits": {
      "traitId": "basic_info",
      "data": [data]
    }
  }]);
}

/**
 * Update my title and bio
 */
export function updateMyTitleAndBio(myusername, prevBasicInfo, data){
  return axios.put(`${config.API.V5}/members/${myusername}/traits`, [{
    "categoryName": "Basic Info",
    "traitId": "basic_info",
    "traits": {
      "traitId": "basic_info",
      "data": [{
        ...prevBasicInfo,
        ...data
      }]
    }
  }]);
}
