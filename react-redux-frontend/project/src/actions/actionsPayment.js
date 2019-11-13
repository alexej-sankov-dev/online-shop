import {SET_ADDRESS, VERIFY_ORDER} from './types'

export const setAddress = address => ({
    type: SET_ADDRESS,
    payload: address
});

export const verifyOrder = () => ({
    type: VERIFY_ORDER
});


