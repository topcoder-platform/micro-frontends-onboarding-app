import Button from "components/Button";
import React, { useState } from "react";
import { navigate } from "@reach/router";

import PaymentInfo from "./PaymentInfo";
import IconDollar from "../../assets/images/icon-dollar.svg";
import IconWorld from "../../assets/images/icon-world.svg";
import IconSpeed from "../../assets/images/icon-speed.svg";
import PayoneerLogo from "../../assets/images/Payoneer_log_gray.svg";
import PayPaLogo from "../../assets/images/PayPal_logo_gray.svg";
import WesternUnionLogo from "../../assets/images/Western_Union_Logo_gray.svg";
import PageDivider from "components/PageDivider";
import { PAYMENT_METHOD_MAP, PAYMENT_METHODS, BUTTON_TYPE } from "constants";
import PaymentMethod from "../../routes/PaymentSetup/PaymentMethod";

import "./styles.module.scss";

/**
 * List of payments methods shown in provider page
 * @returns
 */
const PaymentMethods = ({ handleConfirm = (f) => f }) => {
  const [selectedMethod, setSelectedMethod] = useState("");

  return (
    <div>
      <div styleName="payment-methods">
        {PAYMENT_METHODS.map((method) => (
          <div styleName="payment-method-card">
            <div styleName="payment-logo">
              {PAYMENT_METHOD_MAP[method.name] === "Payoneer" && (
                <PayoneerLogo />
              )}
              {PAYMENT_METHOD_MAP[method.name] === "Paypal" && <PayPaLogo />}
              {PAYMENT_METHOD_MAP[method.name] === "Western Union" && (
                <WesternUnionLogo />
              )}
            </div>
            <PageDivider styleName="divider" />
            <div styleName="content-wrapper">
              <PaymentInfo
                icon={<IconDollar />}
                label="Fees"
                value={method.fees}
                isLastChild={false}
              />
              <PaymentInfo
                icon={<IconWorld />}
                label="countries"
                value={`Available in ${method.countries}+ countries`}
                isLastChild={false}
              />
              <PaymentInfo
                icon={<IconSpeed />}
                label="Speed"
                value={`Up to ${method.speed} Business Day`}
                isLastChild={true}
              />
            </div>
            <div styleName="button-wrapper">
              <Button
                type={BUTTON_TYPE.SECONDARY}
                styleName="payment-button"
                onClick={() => {
                  setSelectedMethod(method.name);
                }}
              >
                SELECT {PAYMENT_METHOD_MAP[method.name]}
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div styleName="info-text">
        The information above is gathered from each payment provider's
        perspective website. We encourage you to do any additional information
        gathering you see fit prior to making a payment provider decision.
      </div>

      {selectedMethod && (
        <PaymentMethod
          paymentMethod={selectedMethod}
          show
          handleClose={() => {
            setSelectedMethod("");
          }}
          handleConfirm={() => {
            handleConfirm();
          }}
        />
      )}
    </div>
  );
};

export default PaymentMethods;
