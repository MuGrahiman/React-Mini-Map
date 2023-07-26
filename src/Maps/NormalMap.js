import React, {  useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
// mapboxgl.dif = 'mujeebrahiman'
export default function NormalMap({
  Options,
  MapContainer,
  Longitude,
  Latitude,
  Zoom,
  Active,
  setMap,
}) {

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: MapContainer.current,
      style: "mapbox://styles/mapbox/satellite-streets-v12", // style URL
      center: [Longitude, Latitude],
      zoom: Zoom,
    });

    map.setStyle(`mapbox://styles/mapbox/${Active.property}`);
      console.log(Active.property)
     
    setMap(map);

    // Clean up on unmount
    return () => map.remove();
  }, [Active]);

  return <div ref={MapContainer} className="map-container" />;
}
