import React from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
// connect Formik
import { Formik } from "formik";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { FieldInput } from "../Form/components/helpers/FieldInput";
import { AuthScheme } from "../../shared/schemes";
import "./Introduction.scss";

import { SERVER_URL } from "../../shared/serverUrl";

const Introduction = props => {
  const handleSubmitting = fields => {
    // console.log(fields);
    if (fields) {
      axios
        .post(`${SERVER_URL}/auth`, fields)

        .then(res => {
          console.log(res);
          console.log(res.body);

          if (res.status === 200) {
            // console.log(res.status);
            props.history.push("dashboard");
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };
  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validationSchema={AuthScheme}
        onSubmit={handleSubmitting}
      >
        {({ errors, isValid, touched, handleSubmit, handleReset, dirty }) => (
          <Form className="auth">
            <Col className="inputFiels">
              {/* ---------------Email -----------------------*/}
              <FieldInput type="text" name="email" labels="Email" />

              {/* ---------------Password -----------------------*/}
              <FieldInput type="password" name="password" labels="Password" />
            </Col>
            <Col className="auth-buttons">
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
                  titleBtn="Sign In"
                />
              </ButtonGroup>
            </Col>
          </Form>
        )}
      </Formik>

      <Col className="intro">
        <p>Do you want to create account?</p>
        <div className="intro-btn">
          <Button variant="outline-primary" onClick={props.nextStep}>
            Sign Up
          </Button>
        </div>
      </Col>
    </>
  );
};

export default withRouter(Introduction);
