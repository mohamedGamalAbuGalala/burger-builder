import React, {Component} from "react";
import {connect} from "react-redux";

import Aux from "../../hoc/ReactAux/ReactAux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import AxiosInstance from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import * as actionType from "../../store/actions";

class BurgerBuilder extends Component {
    // constructor(props) {     super(props);     this.state={} }

    state = {
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        AxiosInstance
            .get("https://react-galala-burger.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data});
            })
            .catch(err => {
                this.setState({error: true});
            });
    }

    updatePurchaseState(ingredients) {
        const sum = Object
            .keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this
            .props
            .history
            .push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ing
        };

        for (const key in disabledInfo) 
            disabledInfo[key] = disabledInfo[key] <= 0;
        
        let orderSummary = null;

        let burger = this.state.error
            ? (
                <p style={{
                    textAlign: "center"
                }}>
                    Ingredients can't be loaded!
                </p>
            )
            : (<Spinner/>);

        if (this.props.ing) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ing}/>
                    <BuildControls
                        ordered={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ing)}
                        price={this.props.price}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}/>
                </Aux>
            );

            orderSummary = (<OrderSummary
                purchaseCanceled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ing}
                price={this.props.price}/>);
        }

        if (this.state.loading) 
            orderSummary = <Spinner/>;
        
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {ing: state.ingredients, price: state.totalPrice};
};
const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: igName => dispatch({type: actionType.ADD_INGREDIENT, ingredientName: igName}),
        onIngredientRemoved: igName => dispatch({type: actionType.REMOVE_INGREDIENT, ingredientName: igName})
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithErrorHandler(BurgerBuilder, AxiosInstance));
