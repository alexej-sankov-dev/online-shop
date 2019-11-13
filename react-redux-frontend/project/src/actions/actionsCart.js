import history from '../history';

import {ADD_TO_CART, ADD_TO_CART_WITH_QUANTITY, REMOVE_FROM_CART, SET_ORDERED_CART, CLEAR_CART, CHANGE_PRODUCT_QUANTITY} from './types'

import products from '../apis/Products'


export const addToCartUnsafe = productId => ({
    type: ADD_TO_CART,
    payload : productId
});

export const addToCartWithQuantity = (productId, quantity) => ({
    type: ADD_TO_CART_WITH_QUANTITY,
    payload: {
        productId,
        quantity
    }
});

export const addToCart = productId => async (dispatch, getState) => {
    const response = await products.get(`/products/${productId}`);
  if (response.data.stock > 0) {
      console.log('product is still available')
    dispatch(addToCartUnsafe(productId))
    history.push(`/addedToCart/${productId}`)
  } else {
      alert('product is out of stock')
  }
}

export const removeFromCart = productId => ({
    type: REMOVE_FROM_CART,
    payload: productId
});

export const setOrderedCart = (cart) => ({
    type: SET_ORDERED_CART,
    payload: cart
});

export const clearCart = () => ({
    type: CLEAR_CART
});

export const changeProductQuantity = (productId, quantity) => ({
    type: CHANGE_PRODUCT_QUANTITY,
    payload: {
        productId,
        quantity
    }
});