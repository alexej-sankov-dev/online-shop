import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getTotal } from '../../../reducers';
import Modal from '../../Modal';
import history from '../../../history';
import PayPalButton from './PayPalButton';


class PayModal extends React.Component {
    
    renderActions () {
        return (
            <React.Fragment>
                <Link to="/checkout" className="ui button red">Cancel</Link>
            </React.Fragment>
        );
    }

    renderContent() {
        return (
            <React.Fragment>
                <h2>{this.props.total} €</h2>
                <PayPalButton />
            </React.Fragment>
        );
    }

    render () {
        return (
            <Modal
                title="Pay"
                content={this.renderContent()}
                actions={this.renderActions()}
                onDismiss={() => history.push('/checkout')}
            />
        );
    }
}

const mapStateToProps = (state) => {
    return {total: getTotal(state)};
};



export default connect(mapStateToProps)(PayModal);
    
