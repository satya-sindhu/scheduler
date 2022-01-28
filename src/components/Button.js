import React from "react";

import "components/Button.scss";
import classNames from "classnames";

export default function Button(props) {
  let buttonClass = "button";
  buttonClass = classNames('button', { 'button--confirm': props.confirm, 'button--danger': props.danger, 'button--some-other-class': props.someOtherClass });

  return <button className={buttonClass} onClick={props.onClick} disabled={props.disabled}>{props.children}</button>;
}

