import React, { useRef, useEffect } from "react";
import exifr from "exifr";

export function ConvertDMSToDD(degrees, minutes, seconds, direction) {
  var dd = degrees + minutes / 60 + seconds / 3600;
  if (direction === "S" || direction === "W") {
    dd = dd * -1;
  }
  return dd;
}

export function getLatLong(exifdata) {
  if (!exifdata.GPSLatitude || !exifdata.GPSLongitude) {
    return null;
  }

  var latDegree = exifdata.GPSLatitude[0].numerator;
  var latMinute = exifdata.GPSLatitude[1].numerator;
  var latSecond = exifdata.GPSLatitude[2].numerator;
  var latDirection = exifdata.GPSLatitudeRef;

  var lat = ConvertDMSToDD(latDegree, latMinute, latSecond, latDirection);

  var lonDegree = exifdata.GPSLongitude[0].numerator;
  var lonMinute = exifdata.GPSLongitude[1].numerator;
  var lonSecond = exifdata.GPSLongitude[2].numerator;
  var lonDirection = exifdata.GPSLongitudeRef;

  var long = ConvertDMSToDD(lonDegree, lonMinute, lonSecond, lonDirection);

  return { lat, long };
}

export function getImageLocation(img) {
  return exifr.gps(img);
}

export default function ImgWithLocation({ onLocation, ...props }) {
  const imgEl = useRef(null);
  return <img ref={imgEl} alt="" {...props} />;
}
