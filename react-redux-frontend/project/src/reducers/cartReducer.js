import _ from 'lodash';
import { ADD_TO_CART, REMOVE_FROM_CART, SIGN_OUT, ADD_TO_CART_WITH_QUANTITY, CLEAR_CART, CHANGE_PRODUCT_QUANTITY } from "../actions/types";



export default (state = {}, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const value = state[action.payload] ? state[action.payload]+1 : 1;
            return { ...state, [action.payload]: value};
        case ADD_TO_CART_WITH_QUANTITY:
            const {productId, quantity} = action.payload;
            const value1 = state[productId] ? state[productId] + quantity : quantity;
            return { ...state, [productId]: value1};
        case CHANGE_PRODUCT_QUANTITY:
            return {...state, [action.payload.productId]: action.payload.quantity}             
        case REMOVE_FROM_CART:
            return _.omit(state, action.payload);
        case SIGN_OUT:
            return {};
        case CLEAR_CART:
            return {};
        default:
            return state;
    }
}

export const getCart = (state = {} , action) => {
    return state;
}