/**
 * Onboard Progress
 *
 * Onboard Progress (level) Indicator
 */
import React, {useState} from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";
import ProgressDonutChart from "components/ProgressDonutChart";
import ProgressPopup from "components/ProgressPopup";
import IconThreeDots from "../../assets/images/icon-three-dots-vertical.svg";
import {ProgressLevels as levels} from "constants";

const OnboardProgress = ({ level, styleName, ...props }) => {
  const [progressPopupOpen, setProgressPopupOpen] = useState(false);
  return (
    <div styleName={cn("onboard-progress", styleName || "" )} {...props}>
      <div styleName="level-container">
        <div styleName="level">
          <span styleName="level-num">STEP {level} </span>
          <span styleName="muted">/ {levels.length}</span>
        </div>
        <div>{levels[level - 1].label}</div>
      </div>
      <ProgressDonutChart styleName="progress-donut-chart" progress={100 * (level / levels.length)} />
      <div styleName="progress-popup-toggle" onClick={e => setProgressPopupOpen(o => !o)}>
        <IconThreeDots/>
      </div>
      <ProgressPopup level={level} levels={levels} open={progressPopupOpen} handleClose={e => setProgressPopupOpen(false)} />
    </div>
  );
};

OnboardProgress.propTypes = {
  level: PT.number,
};

export default OnboardProgress;
