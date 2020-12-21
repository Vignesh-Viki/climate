import React, { Component } from "react";
import Currency from './Currency'
import './Climate.css'



class Climate extends Component {
  constructor(props) {
    super();
    this.state = {
      props : this.props,
      currentTemp: '',
      city : '',
      daily : [],
      start : 0,
      end : 3,
      country : [],
      icon : '',
      myArray : []
    };

  this.handleClimate = this.handleClimate.bind(this)
  this.handleDaily = this.handleDaily.bind(this)

  }

  async handleClimate(){
  if(this.props.myProps.latitude){
    let url = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + this.props.myProps.latitude +'&lon='+ this.props.myProps.longitude +'&exclude=minute,alerts&appid=b05a5d24739a14d589a0e40232e7353d&units=metric'
    let getData = await fetch(url)
    let response = await getData.json()
    let currentLocation = await fetch('https://ipinfo.io?token=3df8a26c9f465f')
    let resp = await currentLocation.json()
    this.setState({currentTemp : response.current.temp, city :  resp.city + "," + resp.country, daily : response.daily, code : this.props.myCity.features[0].context[2].short_code ,country : this.props.myCity.features[0].place_name})
  }
  }

  handleDaily(){
    let start = this.state.start+3
    let end = this.state.end+3
    this.setState({start : start, end : end})

  }

  componentDidMount() {
    this.handleClimate()
    }

  render() {
    let local = this.state
    return (
      <div>
        <div>
          <div> {local.country} </div>
          <div> {local.currentTemp} C</div>
          <div><input className ="button" type = "button" value="Next 3 days" onClick = {this.handleDaily}/></div>
        </div>

        <div>
          {this.state.daily.slice(local.start, local.end).map((messageObj, index) => {
            let dateObject = new Date(messageObj.dt * 1000)
            let icon = 'http://openweathermap.org/img/w/' + messageObj.weather[0].icon + '.png'
              return (
                <div className="climate" key = {index} style = {{ display : "inline-block"}}>
                  <p>{dateObject.getDate() + "," +dateObject.toLocaleString('default', { month: 'long' }).slice(0,3)} </p>
                  <p>{messageObj.temp.eve} C </p>
                  <p><img id="wicon" src= {icon} alt="Weather icon" /> </p>
                  <p>{messageObj.weather[0].description} </p>
                </div>
              );
            })
          }
        </div>
        <div key={this.state.country}><Currency myProp = {this.state.code} /> </div>
      </div>
    );
  }
}
export default Climate;