import React, { useState } from "react";
import axios from "axios";
import { AccountFields } from "../Formik/AccountFields";
import { SurveyFields } from "../Formik/SurveyFields";

import { Welcome } from "../Welcome/Welcome";
// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";

export const Form = props => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const handleSubmit = newData => {
    // Why {}?
    setData({ ...data, newData });
  };

  const sendData = () => {
    if (data) {
      axios
        .post(`${SERVER_URL}/users`, data)
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
  const nextStep = () => {
    setStep(step + 1);
  };
  const prevStep = () => {
    setStep(step - 1);
  };

  switch (step) {
    case 0:
      return (
        <AccountFields
          handleSubmit={handleSubmit}
          nextStep={nextStep}
        ></AccountFields>
      );
    case 1:
      return (
        <SurveyFields
          handleSubmit={handleSubmit}
          prevStep={prevStep}
          nextStep={sendData}
          error={{errorMessage, show, handleClose}}
        ></SurveyFields>
      );
    case 2:
      return <Welcome></Welcome>;
    default:
  }
};
