/** Payment setup page */
import React, {useState} from "react";
import PT from "prop-types";
import "./styles.module.scss";
import { Link } from "@reach/router";
import { useSelector } from "react-redux";
import withAuthentication from "hoc/withAuthentication";
// import components and other stuffs
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageH1 from "components/PageElements/PageH1";
import PageH2 from "components/PageElements/PageH2";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import Button from "components/Button";
import OnboardProgress from "components/OnboardProgress";
import { BUTTON_SIZE, BUTTON_TYPE } from "constants";

const PaymentSetup = () => {
  const authUser = useSelector((state) => state.authUser);
  return (
    <>
      <Page title="Payment Setup"  styleName="payment-setup">
        <PageContent>
          <PageH2>Payment Setup</PageH2>
          {authUser.handle}!
          <PageDivider />
          <PageH1>Not Implemented!</PageH1>
          <PageDivider />
          <PageFoot align="between">
            <Link to="/onboard/contact-details">
              <Button size={BUTTON_SIZE.MEDIUM} type={BUTTON_TYPE.SECONDARY}>{"< "}Back</Button>
            </Link>
            <Link to="/onboard/build-my-profile">
              <Button size={BUTTON_SIZE.MEDIUM}>CONTINUE TO BUILD MY PROFILE</Button>
            </Link>
          </PageFoot>
          <OnboardProgress level={3} />
        </PageContent>
      </Page>
    </>
  )
};

export default withAuthentication(PaymentSetup);
