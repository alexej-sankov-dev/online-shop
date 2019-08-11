import { combineReducers } from 'redux';
import {reducer as formReducer} from "redux-form";
import authReducer from './authReducer';
import productReducer from './productReducer';
import cart from './cartReducer';
import payment from './paymentReducer'
import {getCart} from './cartReducer';
import {getProduct} from './productReducer';


export default combineReducers({
    auth: authReducer,
    form: formReducer,
    products: productReducer,
    cart : cart,
    payment
});

const getProductsInCart = state => getCart(state.cart);
const getProductById = (state, id) => getProduct(state.products, id);



export const getTotal = state => {
    const total = Object.keys(getProductsInCart(state))
    .reduce((total, id) =>
        total + getProductById(state, id).price * getProductsInCart(state)[id],
        0
    ).toFixed(2);

    return total;
}

/*
getAddedIds(state)
    .reduce((total, id) =>
      total + getProduct(state, id).price * getQuantity(state, id),
      0
    )
    .toFixed(2)

    */