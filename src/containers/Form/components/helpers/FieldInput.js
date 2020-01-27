// Connect libraries
import React from "react";
import { connect, ErrorMessage, Field } from "formik";

export const FieldInput = connect(props => {
  const { errors, touched } = props.formik;
  const { ...inputProps } = props;

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
        <Field
          name={inputProps.name}
          type={inputProps.type}
          className={
            "form-control" +
            (errors[inputProps.name] && touched[inputProps.name]
              ? "   is-invalid"
              : "")
          }
        />
      </div>
    </>
  );
});
