import React from 'react';
import {connect} from 'react-redux';
import {fetchProduct, deleteProduct} from "../../actions";
import {Link} from 'react-router-dom';

import Modal from '../general/Modal';
import history from '../../history';

class ProductDelete extends React.Component {
    
    componentDidMount() {
        console.log(this.props);
        this.props.fetchProduct(this.props.match.params.id);
    }

    renderActions () {
        return (
            <React.Fragment>
                <button
                    onClick={() => this.props.deleteProduct(this.props.match.params.id)}
                    className="ui button negative"
                >
                    Delete
                </button>
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        if(!this.props.product) {
            return 'Are you sure you want to delete this product?'
        }
        return `Are you sure you want to delete this product with title: ${this.props.product.title} ?`;
    }

    render () {
        return (
            <Modal
                title="Delete Product"
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



export default connect(mapStateToProps, {fetchProduct, deleteProduct})(ProductDelete);