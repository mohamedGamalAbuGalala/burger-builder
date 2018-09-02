import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.css";
import AxiosInstance from "../../../axios-orders";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import WithErrorHandler from "../../../hoc/WithErrorHandler/WithErrorHandler";
import * as actions from "../../../store/actions/";
import { updateObject, checkValidity } from "../../../shared/utility";

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
            {
              value: "fastest",
              displayValue: "Fastest"
            },
            {
              value: "cheapest",
              displayValue: "Cheapest"
            }
          ]
        },
        value: "fastest",
        valid: true,
        validation: {}
      }
    },
    formIsValid: false
  };

  orderHandler = event => {
    event.preventDefault();
    // console.log(this.props.ingredients);   // alert("continued!!");

    const formData = {};

    for (const key in this.state.orderForm) {
      const ele = this.state.orderForm[key];
      formData[key] = ele.value;
    }

    const order = {
      ingredients: this.props.ing,
      price: this.props.price,
      orderData: formData,
      userId: this.props.userId
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement
    });

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
      formElementsArray.push({ id: key, config: ele });
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
    if (this.props.loading) form = <Spinner />;
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(ContactData, AxiosInstance));
