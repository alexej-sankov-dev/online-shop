import history from '../history'

import {SIGN_IN, SIGN_OUT, SET_LOADING} from './types'

export {addToCartUnsafe, addToCartWithQuantity, addToCart, removeFromCart, setOrderedCart, clearCart, changeProductQuantity} from './actionsCart'
export {createProduct, fetchProduct, fetchProducts, editProduct, deleteProduct} from './actionsProduct'
export {setAddress, verifyOrder} from './actionsPayment'


export const signIn = (userId) => (dispatch) => {
    dispatch({ type: SIGN_IN, payload: userId});
    history.push('/');
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};


export const setLoading = (loading) => ({
    type: SET_LOADING,
    payload : {
        loading
    }
});