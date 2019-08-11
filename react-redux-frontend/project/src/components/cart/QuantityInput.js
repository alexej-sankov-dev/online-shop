import React from 'react';

class QuantityInput extends React.Component{

    onChange = (e) => {
        this.props.onChange(parseInt(e.target.value, 10));
   }

   renderValues() {
        let valueNum = 5;
        if(this.props.currentQuantity && this.props.currentQuantity > 5) {
            valueNum = this.props.currentQuantity;
        }
       const items = [];
       for(let i= 1; i <= valueNum; i++) {
 
           items.push(<option value={i} key={i}>{i}</option>);
       }
       return items;
   }

    render() {
        let selectedValue;
        if(this.props.currentQuantity) {
            selectedValue = this.props.currentQuantity;
        }
        
        return (
            <div>
                <select className="ui dropdown" onChange={this.onChange} value={selectedValue}>
                    {this.renderValues()}
                </select>
            </div>
        );
    }
}



export default QuantityInput;