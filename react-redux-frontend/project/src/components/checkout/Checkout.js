import React from 'react';
import CheckoutForm from './CheckoutForm';
import PayPalButton from './pay/PayPalButton';
import {Link} from 'react-router-dom';


class Checkout extends React.Component {

    render() {
        
        return (
            <div >
                <h2>Checkout</h2>
                <CheckoutForm />
            </div> 
        );
    }
}

  

export default Checkout;