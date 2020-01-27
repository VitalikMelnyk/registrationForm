import React from "react";
import ProgressBar from "react-bootstrap/ProgressBar";

export const ProgressBars = props => {
  return (
    <>
      <div className="progressBar">
        <ProgressBar
          animated
          now={props.progress}
          className="wrapper-progress"
        />
      </div>
    </>
  );
};
