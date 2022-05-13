import React, { useEffect, useState } from "react";
import { navigate } from "@reach/router";
import Page from "components/Page";
import PageContent from "components/PageContent";
import PageH2 from "components/PageElements/PageH2";

import Button from "components/Button";
import Modal from "components/Modal";
import IconBackArrow from "../../../assets/images/icon-back-arrow.svg";
import {
  BUTTON_TYPE,
  PAYMENT_METHOD_MAP,
  PAYMENT_METHOD_DETAILS_MAP,
  PAYMENT_METHOD_MOBILE_MAP,
} from "constants";
import { useSelector } from "react-redux";
import withAuthentication from "hoc/withAuthentication";
import PageDivider from "components/PageDivider";
import Checkbox from "rc-checkbox";
import EmailDetails from "components/EmailDetails";
import PageFoot from "components/PageElements/PageFoot";
import PageP from "components/PageElements/PageP";

import "rc-checkbox/assets/index.css";
import styles from "./styles.module.scss";
import ScrollToBottom from "components/ScrollToBottom";
import { getAuthUserProfile } from "@topcoder/mfe-header";
import { PAYMENT_PROVIDER } from "constants/";

/**
 * This page is shown when the user selects one of the payment methods from payment providers page
 * @returns
 */
const PaymentMethod = ({
  paymentMethod,
  show = false,
  handleClose = (f) => f,
  handleConfirm = (f) => f,
}) => {
  const authUser = useSelector((state) => state.authUser);
  const [emailedDetails, setEmailedDetails] = useState(false);
  const [myProfileData, setMyProfileData] = React.useState({});

  useEffect(() => {
    // Scroll to top on load of the page
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  const onChange = (event) => {
    setEmailedDetails(event.target.checked);
  };

  const { important, conditions, url } = PAYMENT_METHOD_DETAILS_MAP[
    paymentMethod
  ];

  const onVisitPaymentProvider = () => {
    window.open(url, "_blank");
  };

  const onConfirm = () => {
    localStorage.setItem(
      `${authUser?.handle}_${PAYMENT_PROVIDER}`,
      paymentMethod
    );
    handleConfirm();
    handleClose();
  };

  // Get Member data from redux (firstName, lastName, handle, photoURL) and store it on myProfileData
  React.useEffect(() => {
    if (!authUser || !authUser.handle) return;
    getAuthUserProfile()
      .then((result) => {
        setMyProfileData(result);
      })
      .catch((e) => {});
  }, [authUser]);

  return (
    <Modal show={show} handleClose={handleClose} noMaxWith>
      <Page title="Payment Setup" styleName="styles.page-wrapper">
        <div styleName="styles.payment-method">
          <PageContent styleName="styles.page-content">
            <div styleName="styles.page-header">
              <div styleName="styles.left-pane">
                <PageH2 styleName="styles.payment-service-title">
                  {`connect your ${PAYMENT_METHOD_MAP[paymentMethod]} account`}
                </PageH2>
              </div>
            </div>
            <PageDivider styleName="styles.page-divider" />

            <div styleName="styles.container">
              <div styleName="styles.left-pane">
                <EmailDetails paymentMethod={paymentMethod} />
                <label styleName="styles.form-input-checkbox">
                  <Checkbox
                    checked={emailedDetails}
                    className="payment-service-rc-checkbox"
                    onChange={onChange}
                  />
                  <span styleName="styles.label">
                    Yes, I have emailed my details to{" "}
                    <a
                      href="mailto:support@topcoder.com"
                      styleName="styles.support-email"
                    >
                      support@topcoder.com
                    </a>
                  </span>
                </label>
                {emailedDetails && <ScrollToBottom />}
              </div>
              <div styleName="styles.right-pane">
                <PageH2 styleName="styles.title">{`Create ${PAYMENT_METHOD_MAP[paymentMethod]} account`}</PageH2>
                <PageP styleName="styles.important-text">{important}</PageP>
                <div
                  styleName="styles.condition-text"
                  dangerouslySetInnerHTML={{ __html: conditions }}
                />
                <div styleName="styles.visit-button-wrapper">
                  <Button
                    styleName="styles.visit-button-desktop"
                    onClick={onVisitPaymentProvider}
                    disabled={emailedDetails}
                  >
                    {`Visit ${PAYMENT_METHOD_MAP[paymentMethod]} to create an account`}
                  </Button>
                  <Button
                    styleName="styles.visit-button-mobile"
                    onClick={onVisitPaymentProvider}
                    disabled={emailedDetails}
                  >
                    {`Visit ${PAYMENT_METHOD_MOBILE_MAP[paymentMethod]} to create an account`}
                  </Button>
                </div>
              </div>
            </div>
            <PageDivider styleName="styles.page-divider" />

            <PageFoot styleName="styles.footer">
              <Button
                onClick={handleClose}
                styleName="styles.footer-back-button"
                type={BUTTON_TYPE.SECONDARY}
              >
                <IconBackArrow />
              </Button>
              <div styleName="styles.confirm-button-wrapper">
                <Button
                  onClick={onConfirm}
                  disabled={!emailedDetails}
                  styleName="styles.footer-confirm-button"
                >
                  Confirm
                </Button>
              </div>
            </PageFoot>
          </PageContent>
        </div>
      </Page>
    </Modal>
  );
};

export default withAuthentication(PaymentMethod);
