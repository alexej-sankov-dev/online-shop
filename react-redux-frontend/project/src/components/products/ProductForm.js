import React from 'react';
import {Field, reduxForm} from 'redux-form';

class ProductForm extends React.Component{

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

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };

    render() {
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title" />
                <Field name="description" component={this.renderInput} label="Enter Description" />
                <Field name="price" component={this.renderInput} label="Enter Price" />
                <Field name="stock" component={this.renderInput} label="Enter Stock" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }
}

const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        errors.title = 'You must enter a title'
    }

    if(!formValues.description) {
        errors.description = 'You must enter a description'
    }

    if(!formValues.price) {
        errors.price = 'You must enter a Price'
    }

    if(!formValues.stock) {
        errors.stock = 'You must enter the stock'
    }

    return errors;
};

export default reduxForm({
    form: 'streamForm',
    validate
})(ProductForm);

