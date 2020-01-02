import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
// import Row from "react-bootstrap/Row";
// // import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// import {Welcome} from './Welcome';

import "./SectionForm.scss";

// Yup validation

const SignupScheme = Yup.object().shape({
  email: Yup.string()
    .email("Email is invalid")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required")
});

export const Formiks = props => {
  const handleSubmitting = fields => {
    const dataFiedls = {
      ...fields
    };
    // console.log(fields);
    console.log(dataFiedls);
    if (dataFiedls) {
      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
      axios.post("http://localhost:3002/users", dataFiedls).then(res => {
        console.log(res);
      });
      props.history.push("/welcome");
    }
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        confirmPassword: ""
      }}
      validationSchema={SignupScheme}
      onSubmit={handleSubmitting}
    >
      {({ errors, isValid, touched, handleSubmit, handleReset, dirty }) => (
        <Form className="form">
          <Row noGutters={true} className="wrapper">
            <Col className="header">
              <h1 className="header-title">SignUp</h1>
              {/* <h1 className="form-title">Signup</h1> */}
            </Col>
            <Col className="progressBar">
              <ProgressBar animated now={50} className="wrapper-progress" />
            </Col>
            <Col className="inputFiels">
              {/* ---------------Email -----------------------*/}
              <div className="form-group">
                <label
                  htmlFor="email"
                  className={errors.email && touched.email ? "label-error" : ""}
                >
                  {errors.email && touched.email ? (
                    <ErrorMessage name="email" className="invalid-feedback" />
                  ) : (
                    "Email"
                  )}
                </label>
                <Field
                  name="email"
                  type="text"
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                {/* <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  /> */}
              </div>
              {/* ---------------Email -----------------------*/}

              {/* ---------------Password -----------------------*/}

              <div className="form-group">
                <label
                  htmlFor="password"
                  className={
                    errors.password && touched.password ? "label-error" : ""
                  }
                >
                  {errors.password && touched.password ? (
                    <ErrorMessage
                      name="password"
                      className="invalid-feedback"
                    />
                  ) : (
                    "Password"
                  )}
                </label>
                <Field
                  name="password"
                  type="password"
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
              </div>

              {/* ---------------Password -----------------------*/}

              {/* ---------------Repeat Password -----------------------*/}

              <div className="form-group">
                <label
                  htmlFor="confirmPassword"
                  className={
                    errors.confirmPassword && touched.confirmPassword
                      ? "label-error"
                      : ""
                  }
                >
                  {errors.confirmPassword && touched.confirmPassword ? (
                    <ErrorMessage
                      name="confirmPassword"
                      className="invalid-feedback"
                    />
                  ) : (
                    "Confirm Password"
                  )}
                </label>
                <Field
                  name="confirmPassword"
                  type="password"
                  className={
                    "form-control" +
                    (errors.confirmPassword && touched.confirmPassword
                      ? " is-invalid"
                      : "")
                  }
                />
              </div>
            </Col>
            {/* ---------------Repeat Password -----------------------*/}

            <Col className="formButtons">
              <Link to="/">
                <Button variant="secondary">Previous</Button>
              </Link>
              <ButtonGroup>
                <Button
                  className="mx-2"
                  variant="danger"
                  type="button"
                  onClick={handleReset}
                  disabled={!dirty}
                >
                  Reset
                </Button>
                {/* <Link to="/welcome"> */}
                <Button
                  variant="primary"
                  type="submit"
                  disabled={!isValid || !dirty}
                >
                  Next
                </Button>

                {/* </Link> */}
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
