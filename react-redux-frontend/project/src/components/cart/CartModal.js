import React from 'react';
import _ from 'lodash';
import {Link} from "react-router-dom";
import {connect} from 'react-redux';

import RemoveFromCartButton from './RemoveFromCartButton';
import { fetchProduct, changeProductQuantity } from "../../actions";
import history from '../../history';
import QuantityInput from '../cart/QuantityInput';

class CartModal extends React.Component{

    componentDidMount() {
        if(_.isEmpty(this.props.cart)) {
            //TODO:add a message that no products are in cart
            history.push('/');
        }

        const productIdsInCart = Object.keys(this.props.cart);
        productIdsInCart.forEach(productId => this.props.fetchProduct(productId));

    }
    componentDidUpdate() {
        if(_.isEmpty(this.props.cart)) {
            //TODO:add a message that no products are in cart
            history.push('/');
        }
    }

    

    renderRightContent(product) {
        const currentQuantity = this.props.cart[product.id];

        const handleQuantityChange = (quantity) => {
            this.props.changeProductQuantity(product.id, quantity);
        }

        return (
            <div className="right floated content">
                x{currentQuantity}
                <RemoveFromCartButton productId={product.id} />
                <div style={{"marginTop": "10px"}}>
                    <QuantityInput onChange={handleQuantityChange} currentQuantity={currentQuantity}/>
                </div>
            </div>
        );
    }

    renderList() {
        return Object.values(this.props.products).map( product => {

            

            if(product.id in this.props.cart) {
                return (
                    <div className="item" key={product.id}>
                        {this.renderRightContent(product)}
                        <i className="large middle aligned icon camera" />
                        <div className="content">
                            <Link to={`/products/${product.id}`} className="header">{product.title}</Link>
                            <div className="description">{product.description}</div>
                            <div className="price">{product.price}</div>
                        </div>
                    </div>
                );
            }
            return null;
        });
    }

    getTotal() {

        if(!_.isEmpty(this.props.cart) && !_.isEmpty(this.props.products)) {

            return Object.keys(this.props.cart)
                .reduce((total, id) =>
                    total + this.props.products[id].price * this.props.cart[id],
                    0
            ).toFixed(2);
        }
    }


    render() {
        
        return (
            <div>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cart: state.cart,
        products: state.products
    };
};

export default connect(mapStateToProps, {fetchProduct, changeProductQuantity})(CartModal);