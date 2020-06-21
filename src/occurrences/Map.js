import React, { Component } from "react";
import { Button, Tooltip, withStyles } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";
// import markerIcon from "leaflet/dist/images/marker-icon.png";
// import markerIconRetina from "leaflet/dist/images/marker-icon-2x.png";
import markerIconShadow from "leaflet/dist/images/marker-shadow.png";
import { geolocated } from "../lib/geolocated.js";
import "leaflet/dist/leaflet.css";
import plantMarker from "../assets/plant-marker.svg";

let reactLeaflet,
  LeafletMap,
  LeafletMarker,
  TileLayer,
  leaflet,
  LeafletPopup,
  defaultMarkerIcon;

// // export const defaultPosition = [-19.964222, -43.407032];
export const defaultPosition = [-19.923105, -43.933799];

export class Marker extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    leaflet = require("leaflet");
    if (!reactLeaflet) reactLeaflet = require("react-leaflet");
    LeafletMarker = reactLeaflet.Marker;
    defaultMarkerIcon = new leaflet.Icon({
      iconUrl: plantMarker,
      iconRetinaUrl: plantMarker,
      shadowUrl: markerIconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    this.setState({ isLoading: false });
  }

  render() {
    if (!reactLeaflet || !LeafletMarker) return null;
    return <LeafletMarker icon={defaultMarkerIcon} {...this.props} />;
  }
}

export class Map extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      zoom: 14,
    };
    this.onZoom = this.onZoom.bind(this);
  }

  componentDidMount() {
    if (!reactLeaflet) reactLeaflet = require("react-leaflet");
    LeafletMap = reactLeaflet.Map;
    TileLayer = reactLeaflet.TileLayer;
    this.setState({ isLoading: false });
  }

  onZoom(e) {
    const { _zoom: zoom } = e.target;
    this.setState({ zoom });
  }

  render() {
    if (!LeafletMap || !LeafletMap | !TileLayer) return null;

    const { children, ...mapProps } = this.props;
    const { zoom } = this.state;

    return (
      <LeafletMap
        zoom={zoom}
        onZoom={this.onZoom}
        attributionControl={false}
        {...mapProps}
      >
        {/*<TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
      />*/}
        <TileLayer url="https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicXVlcGxhbnRhIiwiYSI6ImNrOWRqemM2MzAycHQzaGxsd2RjMm02eGEifQ.hWRMUFwqlSf8nbEiJIE5BQ" />
        {children}
      </LeafletMap>
    );
  }
}

export const MapGeolocated = geolocated({
  userDecisionTimeout: 20000,
  suppressLocationOnMount: true,
  isOptimisticGeolocationEnabled: false,
})(
  class extends Component {
    constructor(props) {
      super(props);

      this.state = {
        position: defaultPosition,
      };

      this.ref = React.createRef();
      this.toGoMyLocation = this.toGoMyLocation.bind(this);
    }

    componentDidUpdate(prevProps) {
      const { position, coords, onPositionChange } = this.props;
      if (
        position !== prevProps.position &&
        typeof onPositionChange === "function"
      ) {
        onPositionChange(position);
      }

      if (coords !== prevProps.coords) {
        this.setState({ position: [coords.latitude, coords.longitude] });
      }
    }

    toGoMyLocation(e) {
      e.preventDefault();
      e.stopPropagation();
      this.ref.current.props.getLocation();
    }

    render() {
      const { children, ...mapProps } = this.props;
      const { position } = this.state;

      return (
        <Map ref={this.ref} center={position} {...mapProps}>
          {children}
          <Tooltip title="Minha localização atual" placement="top">
            <MapButton
              variant="outlined"
              style={{ position: "absolute", top: 80, left: 10, zIndex: 1000 }}
              onClick={this.toGoMyLocation}
            >
              <MyLocationIcon />
            </MapButton>
          </Tooltip>
        </Map>
      );
    }
  }
);

export class Popup extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  componentDidMount() {
    if (!reactLeaflet) reactLeaflet = require("react-leaflet");
    LeafletPopup = reactLeaflet.Popup;
    this.setState({ isLoading: false });
  }

  render() {
    if (!LeafletPopup) return null;
    return <LeafletPopup {...this.props} />;
  }
}

export const MapButton = withStyles({
  root: {
    background: "white",
    minWidth: 0,
  },
  outlined: {
    padding: "3px 3px",
    borderWidth: "2px",
  },
})(Button);
