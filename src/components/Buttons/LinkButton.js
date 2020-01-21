import React from "react";
import Button from "react-bootstrap/Button";

export const LinkButton = props => {
  return (
    <>
      <Button
        variant={props.btnType}
        className={props.className}
        disabled={props.disabled}
        onClick={props.onClick}
      >
        {props.titleBtn}
      </Button>
    </>
  );
};
