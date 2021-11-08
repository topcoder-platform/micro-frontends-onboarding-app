import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import ReduxToastr from "react-redux-toastr";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import GetStarted from "./routes/GetStarted";
import ContactDetails from "./routes/ContactDetails";
import PaymentSetup from "./routes/PaymentSetup";
import PaymentProviders from "./routes/PaymentSetup/PaymentProviders";
import PaymentMethod from "./routes/PaymentSetup/PaymentMethod";
import PaymentComplete from "./routes/PaymentSetup/PaymentComplete";
import BuildMyProfile from "./routes/BuildMyProfile";
import Complete from "./routes/Complete";
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
    disableSidebarForRoute("/onboard/payment-setup/payment-providers");
    disableSidebarForRoute("/onboard/payment-setup/payment-providers/paypal");
    disableSidebarForRoute("/onboard/payment-setup/payment-providers/payoneer");
    disableSidebarForRoute("/onboard/payment-setup/payment-providers/western-union");
    disableSidebarForRoute("/onboard/payment-setup/payment-providers/paypal/complete");
    disableSidebarForRoute("/onboard/payment-setup/payment-providers/payoneer/complete");
    disableSidebarForRoute("/onboard/payment-setup/payment-providers/western-union/complete");
  }, []);

  return (
    <div className={styles["topcoder-micro-frontends-onboarding-app"]}>
      <Provider store={store}>
        <Router>
          <GetStarted path="/onboard" />
          <ContactDetails path="/onboard/contact-details" />
          <PaymentSetup path="/onboard/payment-setup" />
          <PaymentProviders path="/onboard/payment-setup/payment-providers" />
          <PaymentMethod path="/onboard/payment-setup/payment-providers/:paymentMethod" />
          <PaymentComplete path="/onboard/payment-setup/payment-providers/:paymentMethod/complete" />
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
