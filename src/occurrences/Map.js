import React, { Component } from "react";
import { Button, Tooltip, withStyles, TextField } from "@material-ui/core";
import MyLocationIcon from "@material-ui/icons/MyLocation";
import SearchIcon from "@material-ui/icons/Search";
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

  componentDidUpdate(prevProps) {
    if (
      prevProps.newZoom !== this.props.newZoom &&
      prevProps.center[0] !== this.props.center[0]
    )
      this.setState({ zoom: this.props.newZoom });
  }

  onZoom(e) {
    const { _zoom: zoom } = e.target;
    this.setState({ zoom });
  }

  render() {
    if (!LeafletMap || !LeafletMap | !TileLayer) return null;

    const { children, ...mapProps } = this.props;
    console.log(mapProps.center);
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
        position: props.position || defaultPosition,
        searchValue: "",
        zoom: 14,
      };

      this.ref = React.createRef();
      this.toGoMyLocation = this.toGoMyLocation.bind(this);
      this.handlerInputSearch = this.handlerInputSearch.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
      const { coords, onPositionChange } = this.props;
      const { position } = this.state;
      if (
        position !== prevState.position &&
        typeof onPositionChange === "function"
      ) {
        onPositionChange(position);
      }

      if (coords !== prevProps.coords) {
        this.setState({ position: [coords.latitude, coords.longitude] });
      }
    }

    handlerInputSearch(event) {
      this.setState({ searchValue: event.target.value });
    }

    calcZoom(placeType) {
      switch (placeType) {
        case "address":
          return 30;
        case "country":
          return 5;
        case "region":
          return 8;
        case "district":
          return 10;
        case "place":
          return 14;
        case "locality":
          return 18;
        case "neighborhood":
          return 24;
        case "poi":
          return 40;
        default:
          return 14;
      }
    }

    getDataAPI() {
      const { searchValue } = this.state;
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=pk.eyJ1IjoicXVlcGxhbnRhIiwiYSI6ImNrOWRqemM2MzAycHQzaGxsd2RjMm02eGEifQ.hWRMUFwqlSf8nbEiJIE5BQ&fuzzyMatch=false&language=pt-BR`
      )
        .then((data) => data.json())
        .then((json) => {
          this.setState({
            position: json.features[0].center.reverse(),
            zoom: this.calcZoom(json.features[0].place_type[0]),
          });
        });
    }

    toGoMyLocation(e) {
      e.preventDefault();
      e.stopPropagation();
      console.log(this.ref.current.props.getLocation);
      this.setState({ zoom: 14 });
    }

    render() {
      const { children, ...mapProps } = this.props;
      const { position, searchValue, zoom } = this.state;
      return (
        <Map newZoom={zoom} ref={this.ref} center={position} {...mapProps}>
          <div
            style={{ position: "absolute", top: 20, right: 20, zIndex: 1000 }}
          >
            <TextField
              size="small"
              label="Endereço"
              variant="outlined"
              value={searchValue}
              onChange={(event) => this.handlerInputSearch(event)}
              style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
            />
            <Button
              size="large"
              color="primary"
              variant="contained"
              aria-label="add"
              onClick={() => {
                this.getDataAPI();
              }}
            >
              <SearchIcon />
            </Button>
          </div>
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
