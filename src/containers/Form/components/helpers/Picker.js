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
      value={value}
      id="date-picker-dialog"
      label="date-picker"
      openTo="year"
      views={["year", "month", "date"]}
      format="dd/MM/yyyy"
      placeholder="10/10/2018"
      onChange={value => {
        // console.log("setting value to", value);
        if (value === null) {
          setFieldValue("date", String(value));
        } else {
          setFieldValue("date", value.toLocaleDateString());
        }
      }}
      // onError={error => {
      //   // handle as a side effect
      //   if (error !== errors[name]) {
      //     setFieldError(name, error);
      //   }
      // }}
    />
  );
};
// export const Picker = ({ field, form, ...other }) => {
//   const currentError = form.errors[field.name];

//   return (
//     <KeyboardDatePicker
//       clearable
//       required
//       autoOk
//       // disablePast
//       name={field.name}
//       value={field.value}
//       format="dd/MM/yyyy"
//       helperText={currentError}
//       error={Boolean(currentError)}
//       onError={error => {
//         // handle as a side effect
//         if (error !== currentError) {
//           form.setFieldError(field.name, error);
//         }
//       }}
//       // if you are using custom validation schema you probably want to pass `true` as third argument
//       onChange={date => form.setFieldValue(field.name, date, false)}
//       {...other}
//     />
//   );
// };
