import React from "react";

import classes from "./Input.css";

const Input = props => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];

  if (props.invalid && props.shouldValidate && props.touched)
    inputClasses.push(classes.Invalid);

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          {...props.elementConfig}
          className={inputClasses.join(" ")}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select
          onChange={props.changed}
          value={props.value}
          className={inputClasses.join(" ")}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
          className={inputClasses.join(" ")}
        />
      );
      break;
  }
  return (
    <div className={classes.Input}>
      <label htmlFor="" className={classes.Label}>
        {props.label}
      </label>
      {inputElement}
    </div>
  );
};

export default Input;
