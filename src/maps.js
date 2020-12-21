import React, { Component } from 'react';
// import {Loader, LoaderOptions} from 'google-maps';
import mapboxgl from 'mapbox-gl/dist/mapbox-gl.js';
import './maps.css'
import Climate from './Climate'

class maps extends Component {
  constructor() {
  	super();
      this.map = '';
      this.infoWindow = '';
      this.state = {
          myArray : [],
          cityName : '',
          position : []
       
      }
    this.initMap = this.initMap.bind(this)

  }
  
  componentDidMount() {
    this.initMap()
  }

  async initMap(){

    const getCoords = async () => {
      const pos = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });
      return {
        longitude: pos.coords.longitude,
        latitude: pos.coords.latitude,
      };
    };
    const coords = await getCoords();

    if ("geolocation" in navigator) { 
      mapboxgl.accessToken = 'pk.eyJ1IjoidmlnbmVzaG1hZ2VzaGt1bWFyIiwiYSI6ImNraXZoYTJ3YTA1MWcydG54cDViaDd2dzQifQ.1e8X7XhSJboOs_apI-eRjg';
      this.map = new mapboxgl.Map({
        container: 'maps',
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coords.longitude, coords.latitude],
        zoom: 12
      });
      let marker = new mapboxgl.Marker()
      .setLngLat([coords.longitude,coords.latitude])
      .addTo(this.map);

      let city = await fetch('https://api.mapbox.com/geocoding/v5/mapbox.places/'+coords.longitude +","+ coords.latitude+'.json?types=place&access_token=pk.eyJ1IjoidmlnbmVzaG1hZ2VzaGt1bWFyIiwiYSI6ImNraXZoN3ZyMDBrNngycm13MGlwbmMzM24ifQ.sa9grCAx0pwvUliO9_SH1Q')
      let cityData = await city.json()   
      this.setState({myArray : coords, cityName : cityData})
    }
  }

  render(){
    return (
        <div style = {{width : '50%', marginTop : '50px'}}>
          <div key={this.state.myArray}><Climate myProps = {this.state.myArray} myCity = {this.state.cityName} /> </div>
          <div style = {{height :'500px',width : '500px', borderRadius : '15px/15px', margin :'auto'}} id = "maps"> </div>
          <div>{this.handleClimate} </div>
        </div>
        )
  }

}

export default maps;
