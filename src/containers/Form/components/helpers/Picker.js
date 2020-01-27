import React from "react";
// import { DatePicker } from "@material-ui/pickers";
import { KeyboardDatePicker } from "@material-ui/pickers";
import "react-datepicker/dist/react-datepicker.css";

export const Picker = ({
  name,
  form: { setFieldValue, setFieldTouched, ...restForm },
  field: { value },
  ...rest
}) => {
  return (
    <KeyboardDatePicker
      name={name}
      required
      autoOk
      id="date-picker-dialog"
      label="date-picker"
      openTo="year"
      views={["year", "month", "date"]}
      format="dd/MM/yyyy"
      placeholder="10/10/2018"
      onChange={value => {
        // console.log("setting value to", value);
        if (value == null) {
          setFieldValue("date", String(value));
        } else {
          setFieldValue("date", value.toLocaleDateString());
        }
      }}
      value={value}
    />
  );
};
