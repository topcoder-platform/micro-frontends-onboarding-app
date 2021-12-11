/**
 * MobileFoot
 *
 * mobile bottom section
 */
import React from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";

const MobileFoot = ({ children, align = "right", styleName, ...props }) => {
  return (
    <div
      styleName={cn("mobile-foot", `align-${align}`, styleName || "")}
      {...props}
    >
      {children}
    </div>
  );
};

MobileFoot.propTypes = {
  children: PT.node,
};

export default MobileFoot;
