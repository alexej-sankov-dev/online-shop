import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import Modal from './Modal';
import history from '../history';

class Login extends React.Component {
    
    

    renderActions () {
        return (
            <React.Fragment>
                <GoogleAuth />
                <Link to="/" className="ui button">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        
        return 'Sign in with Google to add products to cart and use cart!';
    }

    render () {
        return (
            <Modal
                title="Login"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/')}
            />

        );
    }
}




export default Login;