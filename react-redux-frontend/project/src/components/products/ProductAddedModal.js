import React from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from "../../actions";
import {Link} from 'react-router-dom';

import Modal from '../general/Modal';
import history from '../../history';
import CartModal from '../cart/CartModal';

class ProductAddedModal extends React.Component {
    
    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }

    renderActions () {
        return (
            <React.Fragment>
                <Link to="/cart" className="ui primary button">Go to cart</Link>
                <Link to="/" className="ui button">Contiune Shopping</Link>
                <Link to="/checkout" className="ui button primary">Checkout</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        var text = null;
        if(!this.props.product) {
            text = 'Product added to cart'
        }
        text =  `Product added to cart with title: ${this.props.product.title}`;
        return (
            <div>
                <div>{text}</div>
                <CartModal />
            </div>
        );
    }

    render () {
        return (
            <Modal
                title="Added Product"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {product: state.products[ownProps.match.params.id]};
};



export default connect(mapStateToProps, {fetchProduct})(ProductAddedModal);