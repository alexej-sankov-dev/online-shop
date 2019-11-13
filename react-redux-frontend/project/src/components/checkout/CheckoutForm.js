import React from 'react';
import {Field, reduxForm} from 'redux-form';
import { connect } from 'react-redux';
import { setAddress, setOrderedCart } from '../../actions';
import history from '../../history';
import axios from 'axios';

class CheckoutForm extends React.Component{

    renderError({error, touched}) {
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off"/>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = async (formValues) => {
        const res = await axios({
            method: 'post',
            url: 'http://localhost:3001/products/check-stock',
            headers: {
              'content-type': 'application/json'
            },
            data: JSON.stringify({
              cart: this.props.cart
            })});
        console.log(res.data)
        if(res.data === 'AVAILABLE') {
            console.log(formValues);
            this.props.setAddress(formValues);
            this.props.setOrderedCart(this.props.cart);
            history.push('/pay');
        } else {
            alert('Product in cart is out of stock');
        }
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="name" component={this.renderInput} label="Enter first- and lastname" />
                <Field name="email" component={this.renderInput} label="Enter Email" />
                <Field name="address" component={this.renderInput} label="Enter Address" />
                <Field name="city" component={this.renderInput} label="Enter City" />
                <Field name="zip" component={this.renderInput} label="Enter Zip code" />
                <Field name="country" component={this.renderInput} label="Enter Country" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.name) {
        errors.name = 'You must enter a first- and lastname'
    }

    if(!formValues.email) {
        errors.email = 'You must enter a email'
    }

    if(!formValues.address) {
        errors.address = 'You must enter a address'
    }

    if(!formValues.city) {
        errors.city = 'You must enter a city'
    }

    if(!formValues.zip) {
        errors.zip = 'You must enter a zip'
    }

    if(!formValues.country) {
        errors.country = 'You must enter a country'
    }

    return errors;
};

CheckoutForm = reduxForm({
    form: 'checkoutform',
    validate
})(CheckoutForm);

const mapStateToProps = (state) => {
    return {
        cart: state.cart
    }
}

export default connect(mapStateToProps, {setAddress, setOrderedCart})(CheckoutForm);

