import React from "react";
import { withRouter } from "react-router-dom";
import { useCookies } from "react-cookie";
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
import { ModalMessage } from "../Form/components/helpers/ModalMessage";

const Introduction = props => {
  const [cookies, setCookie] = useCookies([]);
  const handleSubmitting = fields => {
    // console.log(fields);
    if (fields) {
      axios
        .post(`${SERVER_URL}/auth`, fields)

        .then(res => {
          console.log(res);

          if (res.status === 200) {
            setCookie("token", res.data);
            console.log("Cookies: ", cookies);
            let token = cookies;
            // const token = false;
            console.log(token);
            if (!token) {
              console.log("Token is null");
            } else {
              props.history.push("dashboard");
              console.log("success");
            }
          }
        })
        .catch(err => {
          console.log(err);
          console.log(err.response.status);
          if (err.response.status === 400) {
            props.error.setErrorMessage(
              err.message + ": Incorect email or password"
            );
            props.error.setShow(true);
          }
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
      <ModalMessage
        errorMessage={props.error.errorMessage}
        show={props.error.show}
        handleClose={props.error.handleClose}
      />
    </>
  );
};

export default withRouter(Introduction);
