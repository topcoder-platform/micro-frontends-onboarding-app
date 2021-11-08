import { range, isUndefined, isNull } from "lodash";

/**
 * This file should contain all application constants which do not depend on the DEV/PROD environment.
 */

/**
 * Skills
 */

import skills_list_dev from "./skills-dev.json";
import skills_list_prod from "./skills-prod.json";
export const skills =
  isUndefined(process.env.APPENV) ||
  isNull(process.env.APPENV) ||
  process.env.APPENV === "dev"
    ? skills_list_dev
    : skills_list_prod;

/**
 * Interests
 */

import interests_list from "./interests.json";
export const interests = interests_list;

/**
 * Time zones
 */

import timeZones_list from "./timezones.json";
import { orderBy } from "lodash";
export const timeZones = orderBy(timeZones_list, ["zoneName"], ["asc"]);

/**
 * Working hours
 */

export const workingHours = range(1, 25).map((h) => `${h}:00`);

/**
 * Industries
 */

import industries_list from "./industries.json";
export const industries = industries_list;

/**
 * Languages and language levels
 */

import { language, spokenLevel, writtenLevel } from "./languageLevels.json";
export const languages = language.map((v) => v.name);
export const spokenLevels = spokenLevel.map((v) => v.name);
export const writtenLevels = writtenLevel.map((v) => v.name);

/**
 * ProgressLevels
 */
export const ProgressLevels = [
  { label: "Get Started", url: "/onboard" },
  { label: "Contact Details", url: "/onboard/contact-details" },
  // "Payment Setup", {/* TODO: We'll integrate payment setup after correctly implementing Tax Forms and Payment Service Provider steps.*/}
  { label: "Building My Profile", url: "/onboard/build-my-profile" },
  { label: "Complete", url: "/onboard/complete" },
];

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

export const MAX_COMPLETED_STEP = "MAX_COMPLETED_STEP";

/**
 * Map of payment method to the display name
 */
export const PAYMENT_METHOD_MAP = {
  "payoneer": "Payoneer",
  "paypal": "Paypal",
  "western-union": "Western Union",
};


/**
 * Map of payment method to the display name for mobile view
 */
 export const PAYMENT_METHOD_MOBILE_MAP = {
  "payoneer": "Payoneer",
  "paypal": "Paypal",
  "western-union": "WU",
};

/**
 * List of payment methods supported
 */
export const PAYMENT_METHODS = [{
  name: "payoneer",
  fees: "$0–$3 + Currency Conversion Rates May Apply",
  countries: 150,
  speed: 1,
}, {
  name: "paypal",
  fees: "3.49% + an international fee (non US) + a fixed fee depending upon currency",
  countries: 150,
  speed: 1,
}, {
  name: "western-union",
  fees: "$8 per transaction(your bank may charge additional fees)",
  countries: 150,
  speed: 1,
}];

/**
 * The payment method details map
 */
export const PAYMENT_METHOD_DETAILS_MAP = {
  "payoneer": {
    instructions: [{
      label: "Email <a href='mailto: support@topcoder.com'>support@topcoder.com</a>",
    }, {
      label: "Subject Line: Topcoder Payment Provider",
    }, {
      label: "In the email include:",
      children: ["Topcoder handle (your username when registering)", "Payoneer Customer ID", "Payoneer Email Address"]
    }],
    conditions: `
      <p>You can elect to receive payments through Payoneer either to your Payoneer prepaid MasterCard or by using their Global Bank Transfer service. The Payoneer Bank Transfer Service offers a local bank transfer option (where available) and a wire transfer option. Certain fees may apply.</p>
    `,
    important: "Important: After you create an account, please email support@topcoder.com with the information outlined",
    url: "https://www.payoneer.com",
  },
  "paypal": {
    instructions: [{
      label: "Email <a href='mailto: support@topcoder.com'>support@topcoder.com</a>",
    }, {
      label: "Subject Line: Topcoder Payment Provider",
    }, {
      label: "In the email include:",
      children: ["Topcoder handle (your username when registering)", "PayPal Email Address"]
    }, {
      label: "Please DO NOT provider a link to your PayPal account. We only need your PayPal email address.",
    }],
    conditions: `
      <p>You can elect to receive payments deposited directly to your PayPal account. Certain fees may apply.</p>
    `,
    important: "Important: After you create an account, please email support@topcoder.com with the information outlined",
    url: "https://www.paypal.com",
  },
  "western-union": {
    instructions: [{
      label: "Email <a href='mailto: support@topcoder.com'>support@topcoder.com</a>",
    }, {
      label: "Subject Line: Topcoder Payment Provider",
    }, {
      label: "In the email include:",
      children: ["Topcoder handle (your username when registering)", "Topcoder Email Address (the email address you used to register)"]
    }],
    conditions: `
      <p>You can elect to be paid via wire transfer through Western Union. There is a US $8 charge for each payment processed by Western Union, which will be deducted from the amount owed to you. You can elect to be paid in either USD or your local currency. However, Western Union does not disclose it’s fees to convert to your local currency so we recommend you choose to receive USD. You may then be subject to conversion fees by your local bank.</p>
      <p><strong>Important:</strong> Use your Topcoder handle as the Payee ID during registration. Use the Preferred Form of Payment as “Fastest,” rather than “Least Cost.” “Least Cost” uses ACH as a form of payment, which is not supported in all countries.</p>
      <p>If you elect to be paid by Western Union, your payment request will be queued and processed semi-monthly, on the 15th and last business day of the month. If the 15th or last day of the month falls on a weekend or holiday, Western Union payments will be processed the next business day.</p>
      <p>In order to be included in the semi-monthly payments, you need to select which payments you would like to be paid for by 10:00 AM EST on the day of the scheduled payment.</p>
    `,
    important: "Important: After you create an account, please return to this screen and enter the appropriate account details.",
    url: "https://www.westernunion.com",
  },
};

/**
 * These are the list of steps in the payment
 */
 export const PAYMENT_STEPS = [
  {
    id: "select",
    label: "Select",
  },
  {
    id: "confirm",
    label: "Confirm",
  },
  {
    id: "complete",
    label: "Complete",
  },
];
