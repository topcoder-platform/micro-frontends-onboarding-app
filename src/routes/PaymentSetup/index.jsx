/** Payment setup page */
import React, { useState } from "react";
import "./styles.module.scss";
import { Link, useNavigate } from "@reach/router";
import { useSelector } from "react-redux";
import withAuthentication from "hoc/withAuthentication";
import PayoneerLogo from "../../assets/images/Payoneer_logo.svg";
import PayPaLogo from "../../assets/images/PayPal_logo.svg";
import WesternUnionLogo from "../../assets/images/Western_Union_Logo.svg";
import RadioButton from "components/RadioButton";
import _ from "lodash";

// import components and other stuffs
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageH1 from "components/PageElements/PageH1";
import PageH2 from "components/PageElements/PageH2";
import PageH3 from "components/PageElements/PageH3";
import PageDivider from "components/PageDivider";
import PageFoot from "components/PageElements/PageFoot";
import PageP from "components/PageElements/PageP";
import Button from "components/Button";
import OnboardProgress from "components/OnboardProgress";
import {
  BUTTON_SIZE,
  BUTTON_TYPE,
  TAX_FORM,
  PAYMENT_PROVIDER,
  PAYMENT_METHOD_MAP,
  MAX_COMPLETED_STEP,
} from "constants";
import { getAuthUserProfile } from "@topcoder/mfe-header";
import config from "../../../config";
import { getCookie } from "utils/";

import IconCheck from "../../assets/images/check.svg";
import IconBackArrow from "../../assets/images/icon-back-arrow.svg";
import PaymentMethods from "components/PaymentMethods";

const PaymentSetup = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    config.TOPCODER_COMMUNITY_WEBSITE_URL + "/home"
  );
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();
  const [yesToPaymentProvider, setYesToPaymentProvider] = useState();

  const [isPaymentServiceSelected, setIsPaymentServiceSelected] = useState(
    false
  );
  const [myProfileData, setMyProfileData] = useState({});
  const [paymentService, setPaymentService] = useState(
    localStorage.getItem(`${authUser?.handle}_${PAYMENT_PROVIDER}`)
  );
  const isNextButtonDisabled =
    !isPaymentServiceSelected && paymentService !== "No";

  React.useEffect(() => {
    if (paymentService !== "No") {
      setIsPaymentServiceSelected(!!paymentService);
    }
  }, [paymentService]);

  // Get Member data from redux (firstName, lastName, handle, photoURL) and store it on myProfileData
  React.useEffect(() => {
    if (!authUser || !authUser.handle) return;
    getAuthUserProfile()
      .then((result) => {
        setMyProfileData(result);
        const url = getCookie("returnAfterOnboard");
        if (url != null) {
          setRedirectUrl(url);
        }
      })
      .catch((e) => {
        // toastr.error('Error', 'failed to get profile basic infos!');
      });
  }, [authUser]);

  return (
    <>
      <Page title="Payment Setup" styleName="payment-setup">
        <PageContent>
          <PageH2>Payment Setup</PageH2>
          {`${myProfileData?.firstName || ""} ${
            myProfileData?.lastName || ""
          } | ${myProfileData?.handle || ""}`}
          <PageDivider />
          <div styleName="cards cards1">
            <div styleName="card card1">
              <PageH1>WE WANT TO PAY YOU</PageH1>
              <PageP styleName="para">
                To get paid you need to complete 2 simple steps, which
                officially allows us to transfer funds to you.
              </PageP>
            </div>
            <div styleName="card logos">
              <PayoneerLogo />
              <PayPaLogo />
              <WesternUnionLogo />
            </div>
          </div>
          <PageDivider />
          <div styleName="cards cards2">
            <div styleName="card card1">
              <PageH3>YOUR PAYMENT PROVIDER</PageH3>
            </div>
            {isPaymentServiceSelected && (
              <SuccessMessage
                message={`You have submitted account details to use ${PAYMENT_METHOD_MAP[paymentService]} as your Payment Service Provider.`}
              />
            )}
          </div>

          {(!isPaymentServiceSelected || paymentService === "No") && (
            <div styleName="cards">
              <div styleName="card card1">
                <PageP styleName="para">
                  Would you like to select your payment provider now?
                </PageP>
              </div>
              <div styleName="card card1">
                <RadioButton
                  onChange={(items) => {
                    const selectedItem = _.find(items, { value: true });
                    if (selectedItem) {
                      setYesToPaymentProvider(selectedItem.label === "Yes");
                      if (selectedItem.label === "No, not at this time") {
                        localStorage.setItem(
                          `${authUser?.handle}_${PAYMENT_PROVIDER}`,
                          "No"
                        );
                        setPaymentService("No");
                      } else {
                        localStorage.removeItem(
                          `${authUser?.handle}_${PAYMENT_PROVIDER}`
                        );
                        setPaymentService("");
                      }
                    }
                  }}
                  size="sm"
                  options={[
                    {
                      label: "Yes",
                      value: false,
                    },
                    {
                      label: "No, not at this time",
                      value: false,
                    },
                  ]}
                  selectedOption={
                    paymentService === "No" ? "No, not at this time" : ""
                  }
                />
              </div>
            </div>
          )}

          {yesToPaymentProvider && !isPaymentServiceSelected && (
            <PaymentMethods
              handleConfirm={() => {
                setPaymentService(
                  localStorage.getItem(
                    `${authUser?.handle}_${PAYMENT_PROVIDER}`
                  )
                );
              }}
            />
          )}
          {(!yesToPaymentProvider || isPaymentServiceSelected) && (
            <div styleName="bottom-space" />
          )}

          <PageDivider />
          <PageFoot align="between" styleName="page-footer">
            <Link to="/onboard/build-my-profile">
              <Button size={BUTTON_SIZE.MEDIUM} type={BUTTON_TYPE.SECONDARY}>
                <IconBackArrow />
                <span styleName="back-button-text">&nbsp;Back</span>
              </Button>
            </Link>
            <div styleName="footer-btns">
              {isNextButtonDisabled && (
                <Link to="/onboard/build-my-profile">
                  <Button
                    size={BUTTON_SIZE.MEDIUM}
                    type={BUTTON_TYPE.SECONDARY}
                  >
                    FINISH LATER
                  </Button>
                </Link>
              )}
              <a href={!isNextButtonDisabled ? redirectUrl : "#"}>
                <Button
                  size={BUTTON_SIZE.MEDIUM}
                  disabled={isNextButtonDisabled}
                  onClick={() => {
                    localStorage.removeItem(MAX_COMPLETED_STEP);
                    localStorage.removeItem(
                      `${authUser?.handle}_${PAYMENT_PROVIDER}`
                    );
                    localStorage.removeItem(`${authUser?.handle}_${TAX_FORM}`);
                  }}
                >
                  <span styleName="next-button-lg">ALL DONE</span>
                  <span styleName="next-button-sm">ALL DONE</span>
                </Button>
              </a>
            </div>
          </PageFoot>
          <OnboardProgress level={4} />
        </PageContent>
      </Page>
    </>
  );
};

function SuccessMessage({ message }) {
  return (
    <div styleName="success-container">
      <IconCheck />
      <div>{message}</div>
    </div>
  );
}

export default withAuthentication(PaymentSetup);
