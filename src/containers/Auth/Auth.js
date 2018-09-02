import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/Spinner/Spinner";
import classes from "./Auth.css";
import * as actions from "../../store/actions";
import { updateObject, checkValidity } from "../../shared/utility";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    formIsValid: false,
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/")
      this.props.onSetAuthRedirectPath("/");
  }

  inputChangedHandler = (event, controlName) => {
    // console.log(event.target.value);
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });

    let formIsValid = true;
    for (const key in updatedControls) {
      const ele = updatedControls[key];
      formIsValid &= ele.valid;
    }
    // console.log(formIsValid);
    this.setState({
      formIsValid: Boolean(formIsValid),
      controls: updatedControls
    });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignUp: !prevState.isSignUp
      };
    });
  };
  render() {
    const formElementsArray = [];
    for (const key in this.state.controls) {
      const ele = this.state.controls[key];
      formElementsArray.push({ id: key, config: ele });
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementsArray.map(formElement => (
          <Input
            key={formElement.id}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            invalid={!formElement.config.valid}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={event => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button disabled={!this.state.formIsValid} btnType="Success">
          SUBMIT
        </Button>
      </form>
    );
    if (this.props.loading) form = <Spinner />;

    let errorMessage = null;
    if (this.props.error)
      errorMessage = (
        <p style={{ fontWeight: "bold", color: "red" }}>
          {this.props.error.message}
        </p>
      );

    return (
      <div className={classes.Auth}>
        {this.props.isAuthenticated && (
          <Redirect to={this.props.authRedirectPath} />
        )}
        {errorMessage}
        {form}
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignUp ? "SIGNIN" : "SIGNUP"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
