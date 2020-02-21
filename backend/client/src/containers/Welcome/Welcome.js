import React from "react";
import Col from "react-bootstrap/Col";
import { LinkButton } from "../../components/Buttons/LinkButton";
import "./Welcome.scss";

export const Welcome = ({ resetStep }) => {
  return (
    <>
      <Col className="figure">
        <div className="circle">
          <div className="rectangle"></div>
        </div>
      </Col>

      <Col className="welcome-btn">
        <LinkButton
          btnType="outline-primary"
          titleBtn="Want to Sign In?"
          onClick={resetStep}
        />
      </Col>
    </>
  );
};
