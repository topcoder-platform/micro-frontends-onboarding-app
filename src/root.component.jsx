import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { Router } from "@reach/router";
import ReduxToastr from "react-redux-toastr";
import { disableSidebarForRoute } from "@topcoder/micro-frontends-navbar-app";
import GetStarted from "./routes/GetStarted";
import ContactDetails from "./routes/ContactDetails";
import PaymentSetup from "./routes/PaymentSetup";
import BuildMyProfile from "./routes/BuildMyProfile";
import Complete from "./routes/Complete";
import TaxForm from "./routes/PaymentSetup/TaxForm";
import Form from "./routes/PaymentSetup/Form";
import TaxInfo from "./routes/PaymentSetup/TaxInfo";
import TaxConfirm from "./routes/PaymentSetup/TaxConfirm";
import TaxComplete from "./routes/PaymentSetup/TaxComplete";
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
    disableSidebarForRoute("/onboard/payment-setup/tax-form");
    disableSidebarForRoute("/onboard/payment-setup/tax-form/:formName");
    disableSidebarForRoute("/onboard/payment-setup/tax-form/:formName/info");
    disableSidebarForRoute("/onboard/payment-setup/tax-form/:formName/confirm");
    disableSidebarForRoute("/onboard/payment-setup/tax-form/:formName/complete");
  }, []);

  return (
    <div className={styles["topcoder-micro-frontends-onboarding-app"]}>
      <Provider store={store}>
        <Router>
          <GetStarted path="/onboard" />
          <ContactDetails path="/onboard/contact-details" />
          <PaymentSetup path="/onboard/payment-setup" />
          <TaxForm path="/onboard/payment-setup/tax-form" />
          <Form path="/onboard/payment-setup/tax-form/:formName" />
          <TaxInfo path="/onboard/payment-setup/tax-form/:formName/info" />
          <TaxConfirm path="/onboard/payment-setup/tax-form/:formName/confirm" />
          <TaxComplete path="/onboard/payment-setup/tax-form/:formName/complete" />
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
