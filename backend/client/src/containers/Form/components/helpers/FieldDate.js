// Connect libraries
import React from "react";
import { connect, ErrorMessage, Field } from "formik";
import { Picker } from "./Picker";

export const FieldDate = connect(props => {
  const { errors, touched } = props.formik;
  const { ...inputProps } = props;
  console.log(errors);
  return (
    <>
      <div className="form-group">
        <label
          htmlFor={inputProps.name}
          className={
            errors[inputProps.name] && touched[inputProps.name]
              ? "label-error"
              : ""
          }
        >
          {errors[inputProps.name] && touched[inputProps.name] ? (
            <ErrorMessage name={inputProps.name} className="invalid-feedback" />
          ) : (
            [inputProps.labels]
          )}
        </label>
        <Field component={Picker} name="date" />
      </div>
    </>
  );
});
