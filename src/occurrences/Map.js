import React, { Component, useState, useEffect, useRef } from 'react';
import { Button, Tooltip, withStyles } from '@material-ui/core';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';
import { geolocated } from '../lib/geolocated.js';
import 'leaflet/dist/leaflet.css';

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
    if (!reactLeaflet) reactLeaflet = require('react-leaflet');
    LeafletMap = reactLeaflet.Map;
    TileLayer = reactLeaflet.TileLayer;
    this.setState({isLoading: false})
  }

  render() {
    if (!LeafletMap || !LeafletMap | !TileLayer) return null;

    const {children, ...mapProps} = this.props

    return <LeafletMap zoom={14} attributionControl={false} {...mapProps}>
        {/*<TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />*/}
      <TileLayer
        url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicXVlcGxhbnRhIiwiYSI6ImNrOWRqemM2MzAycHQzaGxsd2RjMm02eGEifQ.hWRMUFwqlSf8nbEiJIE5BQ"
      />
      {children}
    </LeafletMap>
  }
}

export const MapGeolocated = geolocated({
  userDecisionTimeout: 20000,
  suppressLocationOnMount: true,
  isOptimisticGeolocationEnabled: false,
})((props) => {
  const {coords, onPositionChange, children, ...mapProps} = props;
  const [position, setPosition] = useState(defaultPosition);
	const ref = useRef();

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

  function toGoMyLocation(e) {
    e.preventDefault()
    e.stopPropagation()
    ref.current.props.getLocation()
  }

  return <Map ref={ref} center={position} {...mapProps}>
    {children}
    <Tooltip title="Minha localização atual" placement="top">
      <MapButton variant="outlined" style={{position: 'absolute', top: 80, left: 10, zIndex: 1000}} onClick={toGoMyLocation}><MyLocationIcon /></MapButton>
    </Tooltip>
  </Map>;
})


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

export const MapButton = withStyles({
  root: {
    background: 'white',
    minWidth: 0,
  },
  outlined: {
    padding: '3px 3px',
    borderWidth: '2px',
  }
})(Button)
