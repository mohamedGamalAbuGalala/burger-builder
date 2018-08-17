import React, { Component } from "react";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import AxiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code"
        },
        value: "",
        validation: {
          required: true,
          minLength: 4,
          maxLength: 5
        },
        valid: false,
        touched: false
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Country"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail"
        },
        value: "",
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" }
          ]
        },
        value: "fastest",
        valid: true,
        validation: {}
      }
    },
    loading: false,
    formIsValid: false
  };

  checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) return true;
    if (rules.required) isValid &= value.trim() !== "";
    if (rules.minLength) isValid &= value.length >= rules.minLength;
    if (rules.maxLength) isValid &= value.length <= rules.maxLength;

    return Boolean(isValid);
  };

  orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ingredients);

    //   // alert("continued!!");

    const formData = {};

    for (const key in this.state.orderForm) {
      const ele = this.state.orderForm[key];
      formData[key] = ele.value;
    }

    this.setState({
      loading: true
    });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
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

  inputChangedHandler = (event, inputIdentifier) => {
    // console.log(event.target.value);
    const updatedOrderForm = {
      ...this.state.orderForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = this.checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation
    );
    updatedFormElement.touched = true;
    // console.log(updatedFormElement);
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const key in updatedOrderForm) {
      const ele = updatedOrderForm[key];
      formIsValid &= ele.valid;
    }
    // console.log(formIsValid);
    this.setState({
      formIsValid: Boolean(formIsValid),
      orderForm: updatedOrderForm
    });
  };

  render() {
    const formElementsArray = [];
    for (const key in this.state.orderForm) {
      const ele = this.state.orderForm[key];
      formElementsArray.push({
        id: key,
        config: ele
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
          <Input
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
          />
        ))}
        <Button disabled={!this.state.formIsValid} btnType="Success">
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
