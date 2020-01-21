import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";
import Col from "react-bootstrap/Col";
// import "./../SectionForm.scss";

export const ProgressBars = (props) => {
  return (
    <>
      <Col className="progressBar">
        <ProgressBar
          animated
          now={props.progress}
          className="wrapper-progress"
        />
      </Col>
    </>
  );
};
