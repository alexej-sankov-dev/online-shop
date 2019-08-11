import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {fetchProducts} from "../../actions";
import AddToCartButton from '../cart/AddToCartButton';

class ProductList extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }

    renderButtons(product) {
        return (
            <div className="right floated content">
                <AddToCartButton productId={product.id} isSignedIn={this.props.isSignedIn} />
            </div>
        );
    
    }

    renderAdminButton() {
        if(this.props.currentUserId === "114219350462467110345") {
            return <Link to="/admin" className="ui primary button">Admin</Link>
        }
    }


    renderList() {
        return this.props.products.map( product => {
            return (
                <div className="item" key={product.id}>
                    {this.renderButtons(product)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        <Link to={`/products/${product.id}`} className="header">{product.title}</Link>
                        <div className="description">{product.description}</div>
                        <div className="price">{product.price}</div>
                    </div>
                </div>
            );
        });
    }

    render() {
        return (
            <div>
                <h2>Products</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderAdminButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: Object.values(state.products),
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn
    };
};

export default connect(mapStateToProps, {fetchProducts})(ProductList);