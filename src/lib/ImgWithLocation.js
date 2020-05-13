import React, { useRef, useEffect } from "react";
import exif from "exif-js";

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

export default function ImgWithLocation({ onLocation, ...props }) {
  const imgEl = useRef(null);

  useEffect(() => {
    if (imgEl.current) {
      exif.getData(imgEl.current, function () {
        const exifdata = this.exifdata;
        const location = getLatLong(exifdata);
        if (location) {
          onLocation(location);
        }
      });
    }
  }, [props.src, onLocation]);

  return <img ref={imgEl} alt="" {...props} />;
}
