import React from 'react';
import { connect } from 'react-redux';
import { Router, Route, Switch} from 'react-router-dom';
import ProductList from './products/ProductList';
import ProductCreate from './products/ProductCreate';
import ProductEdit from './products/ProductEdit';
import ProductDelete from './products/ProductDelete';
import ProductShow from './products/ProductShow';
import ProductListAdmin from './products/ProductListAdmin';


import Checkout from './checkout/Checkout';
import ProductAddedModal from './products/ProductAddedModal';
import Login from './general/Login';
import PaymentSuccess from './checkout/payment/PaymentSuccess';
import PaymentCancel from './checkout/payment/PaymentCancel';
import PayModal from './checkout/payment/PayModal';
import Cart from './cart/Cart';
import Header from './general/Header';
import history from '../history';


class App extends React.Component {
    render() {
        return (
            <div className="ui container">
                <Router history={history}>
                    <div>
                        <Header />
                        <Switch>
                            <Route path="/" exact component={ProductList}/>
                            <Route path="/products/new" exact component={ProductCreate}/>
                            <Route path="/products/edit/:id" exact component={ProductEdit}/>
                            <Route path="/products/delete/:id" exact component={ProductDelete} />
                            <Route path="/products/:id" exact component={ProductShow}/>
                            <Route path="/cart" exact component={Cart}/>
                            <Route path="/admin" exact component={ProductListAdmin}/>
                            <Route path="/checkout" exact component={Checkout} />
                            <Route path="/addedToCart/:id" exact component={ProductAddedModal} />
                            <Route path="/login" exact component={Login} />
                            <Route path="/pay" exact component={PayModal} />
                            <Route path="/success" exact componet={PaymentSuccess} />
                            <Route path="/cancel" exact component={PaymentCancel} />
                            
                            
                        </Switch>
                    </div>
                </Router>
            </div>
        );
    }
};

const mapStateToProps = state => {
    return { currentUserId: state.auth.userId };

}    

export default connect(mapStateToProps)(App);