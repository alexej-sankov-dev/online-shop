import React from 'react';
import {connect} from 'react-redux';
import { removeFromCart} from '../../actions';

class RemoveFromCartButton extends React.Component{
//TODO: render only if user is logged in

    onClick = () => {
        this.props.removeFromCart(this.props.productId);
    };

    render() {
        return (
            <React.Fragment>
                <button className="ui button red" onClick={this.onClick}>
                    Remove From Cart
                </button>
            </React.Fragment>
        );
    }

}


export default connect(null,  {removeFromCart })(RemoveFromCartButton)