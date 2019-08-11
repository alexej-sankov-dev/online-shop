import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import {fetchProducts} from "../../actions";

class ProductListAdmin extends React.Component {
    componentDidMount() {
        this.props.fetchProducts();
    }


    renderAdmin(product) {
        return (
            <div className="right floated content">
                <Link to={`/products/edit/${product.id}`} className="ui button primary">
                    Edit
                </Link>
                <Link to={`/products/delete/${product.id}`} className="ui button negative">
                    Delete
                </Link>
            </div>

        );
        
    }

    renderList() {
        return this.props.products.map( product => {
            return (
                <div className="item" key={product.id}>
                    {this.renderAdmin(product)}
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

    renderCreate() {
        if(this.props.isSignedIn) {
            return (
                <div style={{textAlign: 'right'}}>
                    <Link to="/products/new" className="ui button primary">
                        Add Product
                    </Link>
                </div>
            );
        }
    }



    render() {
        return (
            <div>
                <h2>Products - Admin Page</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                {this.renderCreate()}
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

export default connect(mapStateToProps, {fetchProducts})(ProductListAdmin);