/**
 * ProgressPopup
 *
 * Three dots Progress Popup
 */
import React, {useState} from "react";
import PT from "prop-types";
import cn from "classnames";
import "./styles.module.scss";
import IconCheck from "../../assets/images/icon-check.svg";
import IconCross from "../../assets/images/icon-cross.svg";

const ProgressPopup = ({ level, levels, open, handleClose = e => e, styleName, ...props }) => {
  // add a class to show if it's done or current or notDone yet
  const getLevelClass = levelIndex => {
    let levelNumber = levelIndex + 1;
    // last level, everything is done.
    if(level === levels.length) return "done";
    return levelNumber < level ? "done" : (levelNumber === level ? "current" : "")
  }
  return (
    <>
      {open && <div styleName={cn("progress-popup", styleName || "" )} {...props}>
        <IconCross styleName="close-btn" onClick={e => handleClose(e)} />
        <div styleName="levels">
          {levels.map((levelName, levelIndex) => (
            <div styleName="level"><IconCheck styleName={cn("level-check-icon", getLevelClass(levelIndex))}/>
              {levelName}
            </div>
          ))}
        </div>
      </div>}
    </>
  );
};

ProgressPopup.propTypes = {
  level: PT.number,
  levels: PT.array,
  open: PT.bool,
  handleClose: PT.func,
};

export default ProgressPopup;
