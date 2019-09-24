import React, { Component, useState, useEffect } from 'react';
import { geolocated } from "react-geolocated";
// import { Map as LeafletMap, Marker as LeafletMarker, TileLayer } from 'react-leaflet';
// import { Icon as MarkerIcon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// export { Popup } from 'react-leaflet';

let reactLeaflet, LeafletMap, LeafletMarker, TileLayer, leaflet, LeafletPopup, defaultMarkerIcon;

// // export const defaultPosition = [-19.964222, -43.407032];
export const defaultPosition = [-19.923105, -43.933799];

export class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    leaflet = require('leaflet');
    if (!reactLeaflet) reactLeaflet = require('react-leaflet');
    LeafletMarker = reactLeaflet.Marker;
    defaultMarkerIcon = new leaflet.Icon({
        iconUrl: markerIcon,
        iconRetinaUrl: markerIconRetina,
        shadowUrl: markerIconShadow,
        iconSize:    [25, 41],
        iconAnchor:  [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize:  [41, 41],
    });
    this.setState({isLoading: false})
  }

  render() {
    if (!reactLeaflet || !LeafletMarker) return null;
    return <LeafletMarker icon={defaultMarkerIcon} {...this.props} />
  }
}

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    reactLeaflet = require('react-leaflet');
    LeafletMap = reactLeaflet.Map;
    TileLayer = reactLeaflet.TileLayer;
    this.setState({isLoading: false})
  }

  render() {
    if (!LeafletMap || !LeafletMap | !TileLayer) return null;

    const {children, ...mapProps} = this.props

    return <LeafletMap zoom={14} {...mapProps}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />
      {children}
    </LeafletMap>
  }
}

export const MapGeolocated = geolocated({
  userDecisionTimeout: 20000,
  suppressLocationOnMount: true,
  isOptimisticGeolocationEnabled: false,
})(React.forwardRef((props, ref) => {
  const {coords, onPositionChange, ...mapProps} = props;
  const [position, setPosition] = useState(defaultPosition);

  useEffect(() => {
    if(coords) {
      setPosition([coords.latitude, coords.longitude]);
    }
  }, [coords]);

  if (typeof onPositionChange === 'function') {
    useEffect(() => {
        onPositionChange(position);
    }, [position]);
  }

  return <Map ref={ref} center={position} {...mapProps} />;
}))


export class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = {isLoading: true}
  }

  componentDidMount() {
    if (!reactLeaflet) reactLeaflet = require('react-leaflet');
    LeafletPopup = reactLeaflet.Popup;
    this.setState({isLoading: false})
  }

  render() {
    if (!LeafletPopup) return null;
    return <LeafletPopup {...this.props} />
  }
}