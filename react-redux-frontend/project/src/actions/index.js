import products from '../apis/Products';
import history from '../history';
import {SIGN_OUT, SIGN_IN, CREATE_PRODUCT, DELETE_PRODUCT,
        EDIT_PRODUCT, FETCH_PRODUCT, FETCH_PRODUCTS, ADD_TO_CART,
        REMOVE_FROM_CART, ADD_TO_CART_WITH_QUANTITY,
        SET_ADDRESS, VERIFY_ORDER, SET_ORDERED_CART, CLEAR_CART, CHANGE_PRODUCT_QUANTITY} from "./types";

export const signIn = (userId) => (dispatch) => {
    dispatch({ type: SIGN_IN, payload: userId});
    history.push('/');
};

export const signOut = () => {
    return {
        type: SIGN_OUT
    };
};

export const createProduct = (formValues) => async (dispatch, getState) => {
    const response = await products.post('/products', formValues);
    dispatch({type: CREATE_PRODUCT, payload: response.data});
    history.push('/admin');
};

export const fetchProducts = () => async dispatch => {
    const response = await products.get('/products');
    dispatch({type: FETCH_PRODUCTS, payload: response.data});
};

export const fetchProduct = (id) => async dispatch => {
    const response = await products.get(`/products/${id}`);
    dispatch({type: FETCH_PRODUCT, payload: response.data});
};

export const editProduct = (id, formValues) => async dispatch => {
    const response = await products.patch(`/products/${id}`, formValues);
    dispatch({type: EDIT_PRODUCT, payload: response.data});
    history.push('/admin');
};

export const deleteProduct = (id) => async dispatch => {
    await products.delete(`/products/${id}`);
    dispatch({type: DELETE_PRODUCT, payload:id});
    history.push('/admin');
};

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


export const setAddress = address => ({
    type: SET_ADDRESS,
    payload: address
});

export const verifyOrder = () => ({
    type: VERIFY_ORDER
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
})