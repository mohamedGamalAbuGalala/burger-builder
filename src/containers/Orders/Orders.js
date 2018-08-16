import React, { Component } from "react";

import Order from "../../components/Order/Order";
import AxiosInstance from "../../axios-orders";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner";

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  componentDidMount() {
    AxiosInstance.get("/orders.json")
      .then(res => {
        let fetchedOrders = [];
        for (const key in res.data)
          fetchedOrders.push({
            ...res.data[key],
            id: key
          });

        this.setState({
          loading: false,
          orders: fetchedOrders
        });
      })
      .catch(err => {
        this.setState({
          loading: false
        });
      });
  }

  render() {
    let orders = <Spinner />;
    if (!this.state.loading)
      orders = this.state.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={+order.price}
        />
      ));
    return <div>{orders}</div>;
  }
}

export default WithErrorHandler(Orders, AxiosInstance);
