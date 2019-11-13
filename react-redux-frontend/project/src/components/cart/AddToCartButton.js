import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, addToCartWithQuantity} from '../../actions';


class AddToCartButton extends React.Component{
//TODO: render only if user is logged in

    onClick = () => {
        if(this.props.quantity) {
            this.props.addToCartWithQuantity(this.props.productId, this.props.quantity);
        } else {
            this.props.addToCart(this.props.productId);
        }
    };

    render() {
        if(!this.props.isSignedIn) {
            return (
               <React.Fragment>
                <Link to="/login" className="ui button">
                    Add To Cart
                </Link>
                </React.Fragment> 
            );
        }
        return (
            <React.Fragment>
                <button className="ui button primary" onClick={this.onClick}>
                    Add To Cart
                </button>
            </React.Fragment>
        );
    }

}


export default connect(null,  {addToCart, addToCartWithQuantity})(AddToCartButton)