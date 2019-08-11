import React from 'react';
import {connect} from 'react-redux';
import {fetchProduct} from "../../actions";
import QuantityInput from '../cart/QuantityInput';
import AddToCartButton from '../cart/AddToCartButton';


class ProductShow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {currentQuantity: 1};
      }

    componentDidMount() {
        this.props.fetchProduct(this.props.match.params.id);
    }

    componentDidUpdate() {
        console.log(this.state.currentQuantity)

    }

    onChange = (quantity) => {
        this.setState({
            currentQuantity: quantity 
          });
    }

    

    renderButtons = (id) => {
        return (
            <React.Fragment>
                <QuantityInput onChange={this.onChange}/>
                <AddToCartButton productId={this.props.product.id} isSignedIn={this.props.isSignedIn} quantity={this.state.currentQuantity}/>
            </React.Fragment>
        );
    
    }

    render() {
        if(!this.props.product) {
            return <div>Loading...</div>
        }
        const {title,description, price, id} = this.props.product;
        return (
            <div>
                <h1>{title}</h1>
                <h5>{description}</h5>
                <h5>{price}</h5>
                {this.renderButtons(id)}
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        product: state.products[ownProps.match.params.id],
        currentUserId: state.auth.userId,
        isSignedIn: state.auth.isSignedIn,
        cart: state.cart
    };
};

export default connect(mapStateToProps, {fetchProduct})(ProductShow);