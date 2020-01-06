// Connect libraries
import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// connect Formik
import { Formik, Field, Form, ErrorMessage } from "formik";
// Connect Bootstrap
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {SignupScheme} from '../../shared/schemes';
import { LinkButton } from "../../components/Buttons/LinkButton";
import { ProgressBars } from "../../components/ProgressBar/ProgressBar";
// Connect scss files
import "./Formik.scss";
// Connect server url
import {SERVER_URL} from '../../shared/serverUrl';

// // =----------- CONSTANTS ------------------->
// const SERVER_URL = "http://localhost:3002";



// Component
export const Formiks = props => {
  const handleSubmitting = fields => {
    const dataFiedls = {
      ...fields
    };
    // console.log(fields);
    console.log(dataFiedls);
    if (dataFiedls) {
      // alert("SUCCESS!! :-)\n\n" + JSON.stringify(fields, null, 4));
      axios
        .post(`${SERVER_URL}/users`, dataFiedls)
        .then(res => {
          console.log(res);
          props.history.push("/welcome");
        })
        .catch(err => {
          console.log(err);
        });
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
            </Col>
            <ProgressBars progress={50} />
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
                <LinkButton btnType="secondary" titleBtn="Previous" />
              </Link>
              <ButtonGroup>
                <LinkButton
                  btnType="danger"
                  className="mx-2"
                  onClick={handleReset}
                  disabled={!dirty}
                  titleBtn="Reset"
                />
                <LinkButton
                  btnType="primary"
                  onClick={handleSubmit}
                  disabled={!isValid || !dirty}
                  titleBtn="Next"
                />
              </ButtonGroup>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};
