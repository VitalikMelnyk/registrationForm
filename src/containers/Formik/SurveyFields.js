// Connect libraries
import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from "axios";
// connect Formik
import { Formik, Field, Form, ErrorMessage } from "formik";
// Connect Bootstrap
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { SurveyScheme } from "../../shared/schemes";
import { LinkButton } from "../../components/Buttons/LinkButton";
import { ProgressBars } from "../../components/ProgressBar/ProgressBar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";

// Connect scss files
import "./Formik.scss";
// Connect server url
// import { SERVER_URL } from "../../shared/serverUrl";

// Component
export const SurveyFields = props => {
  // const [errorMessage, setErrorMessage] = useState([]);
  // const [show, setShow] = useState(false);

  // const handleClose = () => setShow(false);

  const submitting = fields => {
    console.log(fields);
    const dataFields = {
      ...fields
    };
    props.handleSubmit(dataFields);
    
    props.nextStep();
  };

  return (
    <>
      <Formik
        initialValues={{
          birthday: "",
          city: "",
          age: ""
        }}
        validationSchema={SurveyScheme}
        onSubmit={submitting}
      >
        {({ errors, isValid, touched, handleSubmit, handleReset, dirty }) => (
          <Form className="form">
            <Row noGutters={true} className="wrapper">
              <Col className="header">
                <h1 className="header-title">SignUp</h1>
              </Col>
              <ProgressBars progress={50} />
              <Col className="inputFiels">
                {/* ---------------birthday -----------------------*/}
                <div className="form-group">
                  <label
                    htmlFor="birthday"
                    className={
                      errors.birthday && touched.birthday ? "label-error" : ""
                    }
                  >
                    {errors.birthday && touched.birthday ? (
                      <ErrorMessage
                        name="birthday"
                        className="invalid-feedback"
                      />
                    ) : (
                      "Birthday"
                    )}
                  </label>
                  <Field
                    name="birthday"
                    type="text"
                    className={
                      "form-control" +
                      (errors.birthday && touched.birthday
                        ? "   is-invalid"
                        : "")
                    }
                  />
                  {/* <ErrorMessage
                    name="email"
                    component="div"
                    className="invalid-feedback"
                  /> */}
                </div>
                {/* ---------------Birthday -----------------------*/}

                {/* ---------------City -----------------------*/}
                <div className="form-group">
                  <label
                    htmlFor="city"
                    className={errors.city && touched.city ? "label-error" : ""}
                  >
                    {errors.city && touched.city ? (
                      <ErrorMessage name="city" className="invalid-feedback" />
                    ) : (
                      "City"
                    )}
                  </label>
                  <Field
                    name="city"
                    type="text"
                    className={
                      "form-control" +
                      (errors.city && touched.city ? " is-invalid" : "")
                    }
                  />
                </div>
                {/* ---------------City -----------------------*/}

                {/* ---------------Age -----------------------*/}
                <div className="form-group">
                  <label
                    htmlFor="age"
                    className={errors.age && touched.age ? "label-error" : ""}
                  >
                    {errors.age && touched.age ? (
                      <ErrorMessage name="age" className="invalid-feedback" />
                    ) : (
                      "Age"
                    )}
                  </label>
                  <Field
                    name="age"
                    type="text"
                    className={
                      "form-control" +
                      (errors.age && touched.age ? " is-invalid" : "")
                    }
                  />
                </div>
              </Col>
              {/* ---------------Repeat Password -----------------------*/}

              <Col className="formButtons">
                {/* <Link to="/" onSubmit={props.prevStep}> */}
                <LinkButton
                  btnType="secondary"
                  titleBtn="Previous"
                  onClick={props.prevStep}
                />
                {/* </Link> */}
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

      {props.error.errorMessage && (
        <Modal show={props.error.show} onHide={props.error.handleClose} animation={true}>
          <Modal.Header closeButton>
            <Modal.Title>Error</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.error.errorMessage}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.error.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};
