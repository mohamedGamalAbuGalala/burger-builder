import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import AxiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      postalCode: ""
    }
  };

  orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ingredients);

    //   // alert("continued!!");
    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      customer: {
        name: "galala",
        address: {
          street: "twenty street",
          zipCode: "34711",
          country: "Egypt"
        },
        email: "mohamed.abugalala@gmail.com"
      },
      deliveryMethod: "fastest"
    };
    AxiosInstance.post("/orders.json", order)
      .then(response => {
        this.setState({
          loading: false
        });
        this.props.history.push("/orders");
      })
      .catch(error => {
        this.setState({
          loading: false
        });
      });
  };

  render() {
    let form = (
      <form action="">
        <input
          className={classes.Input}
          type="text"
          name="name"
          id=""
          placeholder="Your Name"
        />
        <input
          className={classes.Input}
          type="email"
          name="email"
          id=""
          placeholder="Your Mail"
        />
        <input
          className={classes.Input}
          type="text"
          name="street"
          id=""
          placeholder="Street"
        />
        <input
          className={classes.Input}
          type="text"
          name="postal"
          id=""
          placeholder="Postal Code"
        />
        <Button clicked={this.orderHandler} btnType="Success">
          ORDER
        </Button>
      </form>
    );
    if (this.state.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
