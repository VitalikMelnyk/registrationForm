import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";

export const LinkButton = props => {
  return (
    <Fragment>
      <Button
        variant={props.btnType}
        className={props.className}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.titleBtn}
      </Button>
    </Fragment>
  );
};
