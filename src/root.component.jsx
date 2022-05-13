import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import ReactHeap from "reactjs-heap";
import ReduxToastr from "react-redux-toastr";
import {
  disableSidebarForRoute,
  disableNavigationForRoute,
} from "@topcoder/mfe-header";
import GetStarted from "./routes/GetStarted";
import ContactDetails from "./routes/ContactDetails";
import PaymentSetup from "./routes/PaymentSetup";
import BuildMyProfile from "./routes/BuildMyProfile";
import store from "./store";
import "./styles/main.vendor.scss";
import styles from "./styles/main.module.scss";
import { HEAP_ANALYTICS_KEY } from "../config";

if (HEAP_ANALYTICS_KEY) {
  ReactHeap.initialize(HEAP_ANALYTICS_KEY);
}

export default function Root() {
  useEffect(() => {
    disableNavigationForRoute("/onboard/*");

    disableSidebarForRoute("/onboard");
    disableSidebarForRoute("/onboard/contact-details");
    disableSidebarForRoute("/onboard/payment-setup");
    disableSidebarForRoute("/onboard/build-my-profile");
  }, []);

  return (
    <div className={styles["topcoder-micro-frontends-onboarding-app"]}>
      <Provider store={store}>
        <Router>
          <GetStarted path="/onboard" />

          <ContactDetails path="/onboard/contact-details" />

          <PaymentSetup path="/onboard/payment-setup" />

          <BuildMyProfile path="/onboard/build-my-profile" />
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
