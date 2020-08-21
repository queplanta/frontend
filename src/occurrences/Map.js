import React, { Component } from "react";
import {
  Button,
  Tooltip,
  withStyles,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";

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

    const { children, mapRef, ...mapProps } = this.props;
    const { zoom, viewport } = this.state;

    return (
      <LeafletMap
        zoom={zoom}
        onZoom={this.onZoom}
        attributionControl={false}
        ref={mapRef}
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
        error: null,
      };

      this.ref = React.createRef();
      this.toGoMyLocation = this.toGoMyLocation.bind(this);
      this.handlerInputSearch = this.handlerInputSearch.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
      const { coords, onPositionChange } = this.props;
      const { position, error, searchValue } = this.state;
      if (
        position !== prevState.position &&
        typeof onPositionChange === "function"
      ) {
        onPositionChange(position);
      }

      if (error && error.triedSearchValue !== searchValue) {
        this.setState({ error: null });
      }

      if (coords !== prevProps.coords) {
        this.setState({ position: [coords.latitude, coords.longitude] });
      }
    }

    handlerInputSearch(event) {
      this.setState({ searchValue: event.target.value });
    }

    getDataAPI() {
      const { searchValue } = this.state;
      const MAPBOX_API_KEY =
        "pk.eyJ1IjoicXVlcGxhbnRhIiwiYSI6ImNrOWRqemM2MzAycHQzaGxsd2RjMm02eGEifQ.hWRMUFwqlSf8nbEiJIE5BQ";
      if (searchValue.length) {
        fetch(
          `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${MAPBOX_API_KEY}&fuzzyMatch=false&language=pt-BR`
        )
          .then((data) => data.json())
          .then((json) => {
            if (
              json.features &&
              json.features.length &&
              json.features[0].bbox
            ) {
              const location = json.features[0];
              this.ref.current.leafletElement.fitBounds([
                [location.bbox[1], location.bbox[0]],
                [location.bbox[3], location.bbox[2]],
              ]);
            } else {
              this.setState({
                error: {
                  msg: "Nenhum resultado encontrado!",
                  triedSearchValue: searchValue,
                },
              });
            }
          });
      } else {
        this.setState({
          error: {
            msg: "O campo de busca não pode estar vazio",
            triedSearchValue: searchValue,
          },
        });
      }
    }

    toGoMyLocation(e) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({ zoom: 14 });
    }

    render() {
      const { children, ...mapProps } = this.props;
      const { position, searchValue, error } = this.state;

      return (
        <Map mapRef={this.ref} center={position} {...mapProps}>
          <form
            style={{
              position: "absolute",
              width: "25%",
              top: 10,
              right: 10,
              zIndex: 1000,
            }}
            autoComplete="off"
            onClick={(e) => e.stopPropagation()}
            onDoubleClick={(e) => e.stopPropagation()}
            onSubmit={(e) => {
              e.preventDefault();
              this.getDataAPI();
            }}
          >
            <FormControl
              variant="filled"
              style={{ width: "100%" }}
              error={!!error}
              onDoubleClick={(e) => e.stopPropagation()}
            >
              <InputLabel style={{ fontSize: "14px" }} htmlFor="input-map">
                Buscar por endereço
              </InputLabel>
              <FilledInput
                id="input-map"
                value={searchValue}
                style={{ backgroundColor: "rgba(255,255,255,0.65)" }}
                onClick={(e) => e.stopPropagation()}
                onDoubleClick={(e) => e.stopPropagation()}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton type="submit" edge="end">
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
                onChange={(event) => this.handlerInputSearch(event)}
              />
              {error && (
                <Alert
                  severity="error"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.65)",
                    marginTop: "10px",
                  }}
                >
                  <AlertTitle>Erro ao buscar endereço.</AlertTitle>
                  {error.msg}
                </Alert>
              )}
            </FormControl>
          </form>
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

const style = () => ({
  root: {
    background: "white",
    minWidth: 0,
  },
  outlined: {
    padding: "3px 3px",
    borderWidth: "2px",
  },
});

export const MapButton = withStyles(style)(Button);
