import React, { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AccountFields } from "./components/AccountFields";
import { SurveyFields } from "./components/SurveyFields";
import { ProgressBars } from "../../components/ProgressBar/ProgressBar";

import { Welcome } from "../Welcome/Welcome";
import Introduction from "../Introduction/Introduction";
// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";
const STEP_TOTAL = 3;

export const Form = props => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const resetStep = () => {
    setStep(0);
  };

  const sendData = latestData => {
    setData(latestData);
    // console.log(data);
    if (latestData) {
      // latest.data = latestData.date.to
      axios
        .post(`${SERVER_URL}/users`, latestData)
        .then(res => {
          console.log(res);
          console.log(res.status);
          nextStep();
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

  const handleSubmit = (newData, shouldSendData = false) => {
    const latestData = { ...data, ...newData };
    console.log(latestData);
    if (shouldSendData) {
      sendData(latestData);
    } else {
      setData(latestData);
    }
  };

  const renderForm = () => {
    switch (step) {
      case 0:
        return (
          <Introduction
            nextStep={nextStep}
            error={{
              errorMessage,
              setErrorMessage,
              setShow,
              show,
              handleClose
            }}
          />
        );
      case 1:
        return (
          <AccountFields
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        );
      case 2:
        return (
          <SurveyFields
            handleSubmit={handleSubmit}
            prevStep={prevStep}
            error={{ errorMessage, show, handleClose }}
          />
        );
      case 3:
        return <Welcome resetStep={resetStep} />;
      default:
        return;
    }
  };

  const switchTitle = step => {
    if (step === 0) {
      return <h1 className="header-title">Sign In</h1>;
    }
    return <h1 className="header-title">Sign Up</h1>;
  };

  return (
    <div className="form">
      <Row className="wrapper no-gutters">
        <Col className="header">
          {switchTitle(step)}
          <ProgressBars progress={(step / STEP_TOTAL) * 100} />
        </Col>
        {renderForm()}
      </Row>
    </div>
  );
};
