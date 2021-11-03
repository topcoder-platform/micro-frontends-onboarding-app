/**
 * This file should contain all application constants which do not depend on the DEV/PROD environment.
 */

/**
 * Skills
 */

import skills_list from './skills.json'
export const skills = skills_list

/**
 * Interests
 */

import interests_list from './interests.json'
export const interests = interests_list

/**
 * Time zones
 */

import timeZones_list from './timezones.json'
import { orderBy } from 'lodash'
export const timeZones = orderBy(timeZones_list, ['zoneName'], ['asc'])

/**
 * Working hours
 */

import workingHours_list from './workinghours.json'
export const workingHours = workingHours_list

/**
 * Industries
 */

import industries_list from './industries.json'
export const industries = industries_list

/**
 * Languages and language levels
 */

import {language, spokenLevel, writtenLevel} from './languageLevels.json'
export const languages = language.map(v => v.name)
export const spokenLevels = spokenLevel.map(v => v.name)
export const writtenLevels = writtenLevel.map(v => v.name)

/**
 * ProgressLevelNames
 */
export const ProgressLevelNames = [
  "Get Started",
  "Contact Details",
  "Payment Setup",
  "Building My Profile",
  "Complete",
]



/**
 * Supported Button Sizes
 */
export const BUTTON_SIZE = {
  SMALL: "small",
  MEDIUM: "medium",
};

/**
 * Supported Button Types
 */
export const BUTTON_TYPE = {
  PRIMARY: "primary",
  SECONDARY: "secondary",
  WARNING: "warning",
  SEGMENT: "segment",
  SEGMENT_SELECTED: "segment-selected",
};


/**
 * All action types
 */
export const ACTION_TYPE = {
  /*
    withAuthentication
   */
  AUTH_USER_SUCCESS: "AUTH_USER_SUCCESS",
  AUTH_USER_ERROR: "AUTH_USER_ERROR",
};

