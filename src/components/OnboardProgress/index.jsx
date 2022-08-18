/**
 * Onboard Progress
 *
 * Onboard Progress (level) Indicator
 */
import React, { useState } from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";
import ProgressDonutChart from "components/ProgressDonutChart";
import ProgressPopup from "components/ProgressPopup";
import IconThreeDots from "../../assets/images/icon-three-dots-vertical.svg";
import IconCrossGreen from "../../assets/images/icon-cross-green.svg";
import config from "../../../config";
import { ProgressLevels as levels, MAX_COMPLETED_STEP } from "constants";
import _ from "lodash";

const OnboardProgress = ({ level, styleName, ...props }) => {
  const [progressPopupOpen, setProgressPopupOpen] = useState(false);
  const maxCompletedStep = localStorage.getItem(MAX_COMPLETED_STEP) || 0;
  const redirectUrl = config.TOPCODER_COMMUNITY_WEBSITE_URL + "/home";

  if (
    _.isUndefined(maxCompletedStep) ||
    _.isNull(maxCompletedStep) ||
    parseInt(maxCompletedStep) < level
  ) {
    localStorage.setItem(MAX_COMPLETED_STEP, level);
  }

  return (
    <div styleName={cn("onboard-progress", styleName || "")} {...props}>
      <div styleName="level-container">
        <div styleName="level">
          <span styleName="level-num">STEP {level} </span>
          <span styleName="muted">/ {levels.length}</span>
        </div>
        <div>{levels[level - 1].label}</div>
      </div>
      <ProgressDonutChart
        styleName="progress-donut-chart"
        progress={100 * (level / levels.length)}
      />
      <a href={redirectUrl} styleName="cancel-onboard">
        <IconCrossGreen />
      </a>
      <div
        styleName="progress-popup-toggle"
        onClick={(e) => setProgressPopupOpen((o) => !o)}
      >
        <IconThreeDots />
      </div>
      <ProgressPopup
        level={level}
        maxStep={maxCompletedStep}
        levels={levels}
        open={progressPopupOpen}
        handleClose={(e) => setProgressPopupOpen(false)}
      />
    </div>
  );
};

OnboardProgress.propTypes = {
  level: PT.number,
};

export default OnboardProgress;
