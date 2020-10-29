import React, { Component } from "react";
import {
  Button,
  Tooltip,
  withStyles,
  InputAdornment,
  TextField,
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

const MAPBOX_API_KEY =
  "pk.eyJ1IjoicXVlcGxhbnRhIiwiYSI6ImNrOWRqemM2MzAycHQzaGxsd2RjMm02eGEifQ.hWRMUFwqlSf8nbEiJIE5BQ";

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

    const { children, mapRef, ...mapProps } = this.props;
    const { zoom } = this.state;

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
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_API_KEY}`}
        />
        {children}
      </LeafletMap>
    );
  }
}

const mapStyles = (theme) => ({
  searchForm: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
    background: "rgba(0, 80, 39, 0.5)",
    padding: theme.spacing(1),
    borderRadius: 4,
    width: "75%",
    [theme.breakpoints.up("sm")]: {
      width: "25%",
    },
  },
  input: {
    background: "rgba(255, 255, 255, 0.9)",
    width: "100%",
  },
});

export const MapGeolocated = withStyles(mapStyles)(
  geolocated({
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

      getZoomByType(placeType) {
        switch (placeType) {
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
          case "address":
            return 30;
          case "poi":
            return 40;
          default:
            return 14;
        }
      }

      getDataAPI() {
        const { searchValue } = this.state;
        if (searchValue.length) {
          this.setState(
            {
              error: null,
            },
            () => {
              fetch(
                `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchValue}.json?access_token=${MAPBOX_API_KEY}&fuzzyMatch=false&language=pt-BR`
              )
                .then((data) => data.json())
                .then((json) => {
                  if (json.features && json.features.length) {
                    const location = json.features[0];
                    console.log(location);
                    if (location.bbox) {
                      this.ref.current.leafletElement.fitBounds([
                        [location.bbox[1], location.bbox[0]],
                        [location.bbox[3], location.bbox[2]],
                      ]);
                    } else {
                      this.ref.current.leafletElement.setView(
                        [location.center[1], location.center[0]],
                        this.getZoomByType(location.place_type)
                      );
                    }

                    if (location.center) {
                      this.setState({
                        position: [location.center[1], location.center[0]],
                      });
                    }
                  } else {
                    this.setState({
                      error: {
                        msg: "Nenhum resultado encontrado!",
                        triedSearchValue: searchValue,
                      },
                    });
                  }
                });
            }
          );
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
        this.ref.current.props.getLocation();
        this.setState({ zoom: 14 });
      }

      render() {
        const {
          classes,
          children,
          hideSearch,
          hideControls,
          ...mapProps
        } = this.props;
        const { position, searchValue, error } = this.state;

        return (
          <Map
            mapRef={this.ref}
            center={position}
            zoomControl={!hideControls}
            {...mapProps}
          >
            {!hideSearch && (
              <form
                className={classes.searchForm}
                autoComplete="off"
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  this.getDataAPI();
                }}
              >
                <TextField
                  style={{ width: "100%" }}
                  placeholder="Buscar por endereço"
                  value={searchValue}
                  InputProps={{
                    className: classes.input,
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton type="submit" size="small">
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  onChange={(event) => this.handlerInputSearch(event)}
                  size="small"
                  variant="outlined"
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
              </form>
            )}
            {children}
            {!hideControls && (
              <Tooltip title="Minha localização atual" placement="top">
                <MapButton
                  variant="outlined"
                  style={{
                    position: "absolute",
                    top: 80,
                    left: 10,
                    zIndex: 1000,
                  }}
                  onClick={this.toGoMyLocation}
                >
                  <MyLocationIcon />
                </MapButton>
              </Tooltip>
            )}
          </Map>
        );
      }
    }
  )
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
