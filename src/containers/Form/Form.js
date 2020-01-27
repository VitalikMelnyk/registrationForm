import React, { useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { AccountFields } from "./components/AccountFields";
import { SurveyFields } from "./components/SurveyFields";
import { ProgressBars } from "../../components/ProgressBar/ProgressBar";

import { Welcome } from "../Welcome/Welcome";
import { Introduction } from "../Introduction/Introduction";
// Connect server url
import { SERVER_URL } from "../../shared/serverUrl";



const STEP_TOTAL = 4;

export const Form = props => {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({});
  const [errorMessage, setErrorMessage] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  // const handleSubmit = (newData, shouldSendData = false) => {
  //   const latestData = { ...data, newData };
  //   // Why {}?
  //   if (shouldSendData) {
  //     sendData(latestData);
  //   } else {
  //     setData(latestData);
  //   }
  // };
  const handleSubmit = newData => {
    setData({ ...data, newData });
  };

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const sendData = data => {
    console.log(data);
    if (data) {
      axios
        .post(`${SERVER_URL}/users`, data)
        .then(res => {
          console.log(res);
          console.log(res.status);
          // props.history.push("/welcome");
          nextStep(step + 1);
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

  const renderForm = () => {
    switch (step) {
      case 1:
        return <Introduction nextStep={nextStep} />;
      case 2:
        return (
          <AccountFields handleSubmit={handleSubmit} prevStep={prevStep} nextStep={nextStep} />
        );
      case 3:
        return (
          <SurveyFields
            handleSubmit={handleSubmit}
            data={data}
            prevStep={prevStep}
            nextStep={sendData}
            error={{ errorMessage, show, handleClose }}
          />
        );
      case 4:
        return <Welcome></Welcome>;
      default:
    }
  };

  return (
    <div className="form">
      <Row className="wrapper no-gutters">
        <Col className="header">
          <h1 className="header-title">SignUp</h1>
          <ProgressBars progress={step / STEP_TOTAL * 100} />
        </Col>
        {renderForm()}
      </Row>
    </div>
  );
};
