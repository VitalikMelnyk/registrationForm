// Connect libraries
import React, { useState } from "react";
import axios from "axios";
// connect Formik
import { Formik } from "formik";

import { AccountBox } from "./helpers/AccountBox";
import { ModalMessage } from "./helpers/ModalMessage";
import { AccountScheme } from "../../shared/schemes";
// Connect scss files
import "./Formik.scss";
// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";
// Component
export const Formiks = props => {
  const [errorMessage, setErrorMessage] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  //   // const handleShow = () => setShow(true);

  const handleSubmitting = fields => {
    const dataFields = {
      ...fields
    };
    console.log(dataFields);
    // props.handleSubmit(dataFields);
    // props.nextStep();

    if (dataFields) {
      axios
        .post(`${SERVER_URL}/users`, dataFields)
        .then(res => {
          console.log(res);
          console.log(res.status);
          props.history.push("/welcome");
        })
        .catch(err => {
          console.log(err.message);
          if (err.message === "Network Error") {
            setErrorMessage(
              err.message + ": You need to launch backend server"
            );
            setShow(true);
          }
        });
    }
  };

  return (
    <>
      <Formik
        component={AccountBox}
        initialValues={{
          email: "",
          password: "",
          confirmPassword: ""
        }}
        validationSchema={AccountScheme}
        onSubmit={handleSubmitting}
      ></Formik>

      <ModalMessage
        errorMessage={errorMessage}
        show={show}
        handleClose={handleClose}
      />
    </>
  );
};
