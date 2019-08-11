import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from "react-redux";
import GoogleAuth from './GoogleAuth';

class Header extends React.Component{

    renderCartButton() {
        if(this.props.currentUserId) {
            return (
                <Link to="/cart">
                    <button className="ui button primary">Cart {this.props.itemsInCart}</button>
                </Link>
            );
        } else {
            return (
                <Link to="/login">
                    <button className="ui button red">Cart</button>
                </Link>
            );
        }  
    }

    render() {
        return (
            <div className="ui secondary pointing menu">
                <Link to="/" className="item">
                    Online Store
                </Link>
                <div className="right menu">
                    <Link to="/" className="item">
                        All Products
                    </Link>
                    <GoogleAuth />
                    {this.renderCartButton()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        itemsInCart: Object.values(state.cart).reduce((pv, cv) => pv + cv, 0),
        currentUserId: state.auth.userId
    };
};



export default connect(mapStateToProps)(Header);