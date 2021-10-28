/* global process */

/**
 * Configure Redux Store
 */
import { createStore, compose, applyMiddleware } from "redux";
import { createPromise } from "redux-promise-middleware";

const middlewares = [
  createPromise({ promiseTypeSuffixes: ["INIT", "DONE", "FAILURE"] }),
];

if (process.env.APPMODE !== "production") {
  const logger = require("redux-logger").createLogger();
  middlewares.push(logger);
}

export default createStore(() => {}, compose(applyMiddleware(...middlewares)));
