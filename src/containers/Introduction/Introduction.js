import React from "react";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { LinkButton } from "../../components/Buttons/LinkButton";
import "./Introduction.scss";

export const Introduction = props => {
  return (
    <>
      <Col className="intro-btn">
        <Form.Group>
          <p>Do you want to create account?</p>

          <Button variant="primary" onClick={props.nextStep}>
            Begin
          </Button>
        </Form.Group>
      </Col>
    </>
  );
};
