// Connect libraries
import React from "react";
// connect Formik
import { Formik, Form } from "formik";
// Connect Bootstrap
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { SurveyScheme } from "../../../shared/schemes";
import { LinkButton } from "../../../components/Buttons/LinkButton";
import { ModalMessage } from "./helpers/ModalMessage";
import { FieldInput } from "./helpers/FieldInput";
import { FieldDate } from "./helpers/FieldDate";
import { FieldSelect } from "./helpers/FieldSelect";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
// Connect scss files
import "./Form.scss";
// Component
export const SurveyFields = props => {
  const handleSubmitting = fields => {
    console.log(fields);
    const dataFields = {
      ...fields
    };
    props.handleSubmit(dataFields);
    // props.nextStep(props.data);
  };


  return (
    <>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Formik
          initialValues={{
            date: null,
            city: "",
            gender: ""
          }}
          validationSchema={SurveyScheme}
          onSubmit={handleSubmitting}
        >
          {({ errors, isValid, touched, handleSubmit, handleReset, dirty }) => (
            <Form>
              <Col className="inputFiels">
                {/* ---------------City -----------------------*/}
                <FieldInput type="text" name="city" labels="City" />
                {/* ---------------City -----------------------*/}

                {/* ---------------DatePicker -----------------------*/}
                <FieldDate name="date" labels="Date" />
                {/* ---------------DatePicker -----------------------*/}

                {/* ---------------Select gender -----------------------*/}
                {/* <FieldInput type="text" name="age" labels="Age" /> */}
                <FieldSelect as="select" name="gender" labels="Gender" />
                {/* ---------------Select gender -----------------------*/}
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
      </MuiPickersUtilsProvider>

      <ModalMessage
        errorMessage={props.error.errorMessage}
        show={props.error.show}
        handleClose={props.error.handleClose}
      />
    </>
  );
};
