import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Router, navigate } from "@reach/router";
import ReduxToastr from "react-redux-toastr";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import { getAuthUserProfile } from "@topcoder/micro-frontends-navbar-app";
import GetStarted from "./routes/GetStarted";
import ContactDetails from "./routes/ContactDetails";
import PaymentSetup from "./routes/PaymentSetup";
import BuildMyProfile from "./routes/BuildMyProfile";
import Complete from "./routes/Complete";
import { getOnboardingChecklist } from './services/onboardingChecklist';
import {checkOnboarding} from './utils';
import store from "./store";
import "./styles/main.vendor.scss";
import styles from "./styles/main.module.scss";

export default function Root() {
  useEffect(() => {
    disableSidebarForRoute("/onboard");
    disableSidebarForRoute("/onboard/contact-details");
    disableSidebarForRoute("/onboard/payment-setup");
    disableSidebarForRoute("/onboard/build-my-profile");
    disableSidebarForRoute("/onboard/complete");
  }, []);

  useEffect(() => {
    (async () => {
      const {handle} = await getAuthUserProfile();
      const response = await getOnboardingChecklist(handle);
      const onboardingPath = checkOnboarding(response);
      if (onboardingPath) {
        navigate(onboardingPath);
      }
    })();
  }, []);

  return (
    <div className={styles["topcoder-micro-frontends-onboarding-app"]}>
      <Provider store={store}>
        <Router>
          <GetStarted path="/onboard" />
          <ContactDetails path="/onboard/contact-details" />
          <PaymentSetup path="/onboard/payment-setup" />
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
