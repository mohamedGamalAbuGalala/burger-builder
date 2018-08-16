import React from "react";

import classes from './CheckoutSummary.css';
import Button from "../../UI/Button/Button";
import Burger from "../../Burger/Burger";

const CheckoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button clicked={props.CheckoutCanceled} btnType="Danger">CANCEL</Button>
      <Button clicked={props.CheckoutContinued} btnType="Success">CONTINUE</Button>
    </div>
  );
};

export default CheckoutSummary;
