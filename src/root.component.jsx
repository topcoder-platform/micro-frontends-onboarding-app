import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import ReactHeap from 'reactjs-heap';
import ReduxToastr from "react-redux-toastr";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import GetStarted from "./routes/GetStarted";
import ContactDetails from "./routes/ContactDetails";
import PaymentSetup from "./routes/PaymentSetup";
import BuildMyProfile from "./routes/BuildMyProfile";
import Complete from "./routes/Complete";
import store from "./store";
import "./styles/main.vendor.scss";
import styles from "./styles/main.module.scss";
import {HEAP_ANALYTICS_KEY} from '../config';


if (HEAP_ANALYTICS_KEY) {
  console.log('heap analytics key found');
  ReactHeap.initialize(HEAP_ANALYTICS_KEY);
} else {
  console.log('heap analytics key missing');
}

export default function Root() {
  useEffect(() => {
    disableSidebarForRoute("/onboard");
    disableSidebarForRoute("/onboard/contact-details");
    disableSidebarForRoute("/onboard/payment-setup");
    disableSidebarForRoute("/onboard/build-my-profile");
    disableSidebarForRoute("/onboard/complete");
  }, []);

  return (
    <div className={styles["topcoder-micro-frontends-onboarding-app"]}>
      <Provider store={store}>
        <Router>
          <GetStarted path="/onboard" />
          <ContactDetails path="/onboard/contact-details" />
          {/* TODO: We'll integrate payment setup after correctly implementing Tax Forms and Payment Service Provider steps.*/}
          {/* <PaymentSetup path="/onboard/payment-setup" /> */}
          <BuildMyProfile path="/onboard/build-my-profile" />
          <Complete path="/onboard/complete" />
        </Router>

        {/* Global config for Toastr popups */}
        <ReduxToastr
          timeOut={4000}
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
        />
      </Provider>
    </div>
  );
}
