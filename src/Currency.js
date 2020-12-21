import React, { Component } from "react";
import country from 'country-js'
import './Currency.css'


class Currency extends Component {
  constructor(props) {
    super();
    this.state = {
    props: this.props,
    base : '',
    rates : []
    };

    this.handleDaily = this.handleDaily.bind(this)

  }

  async handleDaily(){
    if(this.props.myProp !== undefined){
      let base = await country.search(this.props.myProp)
      let fetchUrl = await fetch('https://api.exchangeratesapi.io/latest?base=' + base[0].currency.currencyCode +'&symbols=USD,EUR')
      let rates = await fetchUrl.json()
      this.setState({base : base[0].currency.currencyCode, rates : rates.rates})
    }
  }

  componentDidMount() {
    this.handleDaily()
  }

  render() {
    let local = this.state
    return (
      <div className="currency">
        <p>Currency : {this.state.base} - USD </p>
        <p>Conversion : {local.rates["USD"]}</p>
        <p>Currency : {this.state.base} - EUR </p>
        <p>Conversion : {local.rates["EUR"]}</p>
      </div>
    );
  }
}
export default Currency;