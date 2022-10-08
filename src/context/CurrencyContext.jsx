import React, { Component } from 'react'

const CurrencyContext = React.createContext();

export default CurrencyContext;

export class CurrencyProvider extends Component {
    
    constructor(props){
      super(props);
          this.state = {
            currency: "USD",
          };       
          this.changeCurrency = this.changeCurrency.bind(this);
      }
   
    changeCurrency(e){
      const CurrentCurrency = e.target.value;
      this.setState({currency: CurrentCurrency,})
     }
     
    render() {

    let currency = this.state.currency
    let changeCurrency = this.changeCurrency;

    return (  
        <CurrencyContext.Provider value={{currency, changeCurrency}} >
          {this.props.children}
        </CurrencyContext.Provider>
       )
     }
}

