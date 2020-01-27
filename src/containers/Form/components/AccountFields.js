// Connect libraries
import React from "react";
// connect Formik
import { Formik } from "formik";

import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { LinkButton } from "../../../components/Buttons/LinkButton";
import { FieldInput } from "./helpers/FieldInput";
import { AccountScheme } from "../../../shared/schemes";
// Connect scss files
import "./Form.scss";
// Connect server url
// import { SERVER_URL } from "../../shared/serverUrl";
// Component
export const AccountFields = props => {
  console.log(33333, props);

  const handleSubmitting = fields => {
    const dataFields = {
      ...fields
    };
    console.log(dataFields);
    console.log(props);

    props.handleSubmit(dataFields);
    props.nextStep();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={AccountScheme}
        onSubmit={handleSubmitting}
      >
        {({ errors, isValid, touched, handleSubmit, handleReset, dirty }) => (
          <Form>
            <Col className="inputFiels">
              {/* ---------------Email -----------------------*/}
              <FieldInput type="text" name="email" labels="Email" />
              {/* ---------------Email -----------------------*/}

              {/* ---------------Password -----------------------*/}
              <FieldInput type="password" name="password" labels="Password" />
              {/* ---------------Password -----------------------*/}

              {/* ---------------Repeat Password -----------------------*/}
              <FieldInput
                type="password"
                name="confirmPassword"
                labels="Confirm Password"
              />
              {/* ---------------Repeat Password -----------------------*/}
            </Col>

            <Col className="formButtons">
              <Button variant="secondary" onClick={props.prevStep}>
                Previous
              </Button>
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
          </Form>
        )}
      </Formik>
    </>
  );
};
