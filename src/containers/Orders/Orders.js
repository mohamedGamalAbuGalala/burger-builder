import React, { Component } from "react";
import { connect } from "react-redux";

import Order from "../../components/Order/Order";
import AxiosInstance from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";
import * as actions from "../../store/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
    // console.log(this.props);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading)
      orders = this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    return <div>{orders}</div>;
  }
}

const mapStateToProps = state => {
  // console.log(state.order);
  return {
    orders: state.order.orders,
    loading: state.order.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WithErrorHandler(Orders, AxiosInstance));
