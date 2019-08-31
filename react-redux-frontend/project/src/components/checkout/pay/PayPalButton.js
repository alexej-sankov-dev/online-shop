import React from 'react';
import SmartPaymentButtons from 'react-smart-payment-buttons';
import { connect } from 'react-redux';
import { getTotal } from '../../../reducers';
import {verifyOrder, clearCart, setLoading} from '../../../actions'
import history from '../../../history';
import axios from 'axios';



class PayPalButton extends React.Component {
    
    render() {
      console.log(this.props.total);
      const createOrder = (data, actions) => {
          return actions.order.create({
          "purchase_units": [{
            "amount": {
              "currency_code": "EUR",
              "value" : this.props.total
              
              
            }
          }]
        });
        }

        const onApprove =  (data, actions) => {
            return actions.order.capture().then( async (details) => {
              console.log('payment: '+this.props.paymemt)
              setLoading(true);
              const res = await axios({
                method: 'post',
                url: 'http://localhost:3001/paypal-transaction-complete',
                headers: {
                  'content-type': 'application/json'
                },
                data: JSON.stringify({
                  orderID: data.orderID,
                  address: this.props.payment.address,
                  orderedCart: this.props.payment.orderedCart
              })});
              if(res.status) {
                setLoading(false);
              }
              if(res.status != 200) {
                history.push('/cancel')
              }
              console.log('transcation completed') 
              console.log('order verified: '+res.data ) 
              if(res.data === 'COMPLETED') {
                this.props.verifyOrder();
                console.log('order veryfied');
                this.props.clearCart();

                history.push('/success');
              } else {
                history.push('/cancel')
              }

              });   
        }
        
        return(
            <div>
                <SmartPaymentButtons
                sdkScriptId="x-sdk"
                createOrder={createOrder}
                onApprove={onApprove}
                style={{
                      layout:  'vertical',
                      color:   'gold',
                      shape:   'rect',
                      height:   35,
                      label:   'paypal'
                    }}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
  total: getTotal(state),
  payment: state.payment
});

export default connect(mapStateToProps, {verifyOrder, clearCart, setLoading})(PayPalButton);