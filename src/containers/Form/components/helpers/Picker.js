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
  console.log(11111, value);
  return (
    <KeyboardDatePicker
      name={name}
      required
      autoOk
      id="date-picker-dialog"
      label="date-picker"
      openTo="year"
      views={["year", "month", "date"]}
      //   inputVariant="outlined"
      //   className="form-control"
      //   label="Masked input"
      format="dd/MM/yyyy"
      placeholder="10/10/2018"
      //   onError={()}
      onChange={value => {
        console.log("setting value to", value);
        setFieldValue("date", value.toLocaleDateString());
      }}
      //   onTouch={setFieldTouched}
      value={value}
      //   animateYearScrolling={false}
    />
  );
};
