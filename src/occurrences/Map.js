// import React, { useState, useEffect } from 'react';
// import { geolocated } from "react-geolocated";
// import { Map as LeafletMap, Marker as LeafletMarker, TileLayer, Popup } from 'react-leaflet';
// import { Icon as MarkerIcon } from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import markerIcon from 'leaflet/dist/images/marker-icon.png';
// import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
// import markerIconShadow from 'leaflet/dist/images/marker-shadow.png';

// // export const defaultPosition = [-19.964222, -43.407032];
export const defaultPosition = [-19.923105, -43.933799];

// export const defaultMarkerIcon = new MarkerIcon({
//     iconUrl: markerIcon,
//     iconRetinaUrl: markerIconRetina,
//     shadowUrl: markerIconShadow,
//     iconSize:    [25, 41],
//     iconAnchor:  [12, 41],
//     popupAnchor: [1, -34],
//     tooltipAnchor: [16, -28],
//     shadowSize:  [41, 41],
// });

// export const Marker = (props) => <LeafletMarker  icon={defaultMarkerIcon} {...props} />

// export const Map = React.forwardRef((props, ref) => {
//   const {children, ...mapProps} = props;
//   if (!window) {
//     return null;
//   }
//   return <LeafletMap ref={ref} zoom={14} {...mapProps}>
//     <TileLayer
//       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
//     />
//     {children}
//   </LeafletMap>
// })

// export const MapGeolocated = geolocated({
//   userDecisionTimeout: 20000,
//   suppressLocationOnMount: true,
//   isOptimisticGeolocationEnabled: false,
// })(React.forwardRef((props, ref) => {
//   const {coords, onPositionChange, ...mapProps} = props;
//   const [position, setPosition] = useState(defaultPosition);

//   useEffect(() => {
//     if(coords) {
//       setPosition([coords.latitude, coords.longitude]);
//     }
//   }, [coords]);

//   if (typeof onPositionChange === 'function') {
//     useEffect(() => {
//         onPositionChange(position);
//     }, [position]);
//   }

//   return <Map ref={ref} center={position} {...mapProps} />;
// }))

export const Map = () => {}
export const defaultMarkerIcon = () => {}
export const MapGeolocated = () => {}
export const Marker = () => {}
export const Popup = () => {}
