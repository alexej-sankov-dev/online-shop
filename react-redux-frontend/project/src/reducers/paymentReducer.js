import {SET_ADDRESS, VERIFY_ORDER, SET_ORDERED_CART} from "../actions/types";

const INITIAL_STATE = {
    address: {},
    orderedCart: {},
    verified: false
};

export default (state= INITIAL_STATE, action) => {
    switch(action.type) {
        case SET_ADDRESS:
            return {...state, address: action.payload};
        case SET_ORDERED_CART:
            return {...state, orderedCart: action.payload};
        case VERIFY_ORDER:
            return {...state, verified: true};
        //case DELETE_PRODUCT:
          //  return _.omit(state, action.payload);
        default:
            return state;
    }
}
