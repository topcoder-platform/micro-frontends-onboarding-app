/**
 * DateInput
 *
 * Date Input control.
 */
import React from "react";
import PT from "prop-types";
import DatePicker from "react-datepicker";
import cn from "classnames";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./styles.module.scss";

const DateInput = (props) => {
  return (
    <div styleName={cn("styles.datepicker-wrapper", props.className,
                        props.style2 ? "styles.style2" : "")}>
      <DatePicker
        dateFormat="MM/dd/yyyy"
        placeholderText={props.placeholder}
        selected={props.value}
        onChange={props.onChange}
        onBlur={props.onBlur}
        onCalendarClose={props.onBlur}
        onFocus={props.onFocus}
        showYearDropdown
      />
    </div>
  );
};

DateInput.propTypes = {
  value: PT.string,
  onChange: PT.func.isRequired,
  placeholder: PT.string,
  onBlur: PT.func,
  onFocus: PT.func,
  className: PT.string,
  style2: PT.bool
};

export default DateInput;
