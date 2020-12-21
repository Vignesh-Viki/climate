import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker  } from 'google-maps-react';

const mapStyles = {
  width: '100%',
  height: '100%'
};

class Map1 extends Component {
  constructor() {
    super();
    this.state = {
      name: "React",
      position : ''
    };
  }

componentDidMount() {
  console.log("jjj")
    navigator.geolocation.getCurrentPosition(function(position1) {
      console.log(position1)
      // this.setState({position : position1})
    });
  }

  render() {
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          style={mapStyles}
          initialCenter={{
            lat: 1.2222,
            lng: 1.33333
          }}
        >
         <Marker
          onClick={this.onMarkerClick}
          name={'This is test name'}
        />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDOWKIVX4i13uVnIbjYwkEl57HumQsjP1E'
})(Map1);
// export default Map1;