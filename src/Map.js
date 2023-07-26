import React, { useRef, useEffect, useState } from "react";
import ReactDOM from "react-dom";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import Legend from "./components/Legend";
import Optionsfield from "./components/OptionField";
import {options} from "./Layers/OptionalLayer";
import Tooltip from "./components/ToolTip";
import NormalMap from "./Maps/NormalMap";
import ColorMap from "./Maps/ColorMap";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import HeatMap from "./Maps/HeatMap";
import Terrain3DMap from "./Maps/3dMap";
import PlayGroundMap from "./Maps/PlayGround";


mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

export default function Map() {
  const mapContainer = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [active, setActive] = useState(options[0]);
  const [map, setMap] = useState(null);

  const tooltipRef = useRef(new mapboxgl.Popup({ offset: 15 }));

  useEffect(() => {}, []);

  useEffect(() => {
    if (!map) return; // wait for map to initialize
    // Add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-left");

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        placeholder: "Search for a location", // Set a custom placeholder for the search bar
        marker: {
          color: "orange",
        },
      })
    );
   
    map.on("move", () => {
      setLng(map.getCenter().lng.toFixed(4));
      setLat(map.getCenter().lat.toFixed(4));
      setZoom(map.getZoom().toFixed(2));
    });

    // change cursor to pointer when user hovers over a clickable feature
    map.on("mouseenter", (e) => {
      if (e.features.length) {
        map.getCanvas().style.cursor = "pointer";
      }
    });
    // reset cursor to default when user is no longer hovering over a clickable feature
    map.on("mouseleave", () => {
      map.getCanvas().style.cursor = "";
    });
    // add tooltip when users mouse move over a point
    map.on("mousemove", (e) => {
      const features = map.queryRenderedFeatures(e.point);
      if (features.length) {
        const feature = features[0];

        // Create tooltip node
        const tooltipNode = document.createElement("div");
        ReactDOM.render(<Tooltip feature={feature} />, tooltipNode);

        // Set tooltip on map
        tooltipRef.current
          .setLngLat(e.lngLat)
          .setDOMContent(tooltipNode)
          .addTo(map);
      }
    });
  }, [map]);

 

  const changeState = (i) => {
    console.log(i);
    setActive(options[i]);
  };

  return (
    <div className="App">
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      {active.subName === "Normal" ? (
        <NormalMap
          options={options}
          MapContainer={mapContainer}
          Zoom={zoom}
          Active={active}
          Longitude={lng}
          Latitude={lat}
          setMap={setMap}
        />
      ) : active.subName === "colored" ? (
        <ColorMap
          options={options}
          MapContainer={mapContainer}
          Zoom={zoom}
          setZoom={(d) => setZoom(d)}
          Active={active}
          Longitude={lng}
          setLongitude={(d) => setLng(d)}
          Latitude={lat}
          setMap={setMap}
        />
      ) : active.subName === "Heat Map" ? (
        <HeatMap
          options={options}
          MapContainer={mapContainer}
          Zoom={zoom}
          setZoom={setZoom}
          Active={active}
          Longitude={lng}
          setLongitude={setLng}
          Latitude={lat}
          setLatitude={setLat}
          setMap={setMap}
        />
      ) : active.subName === "terrain Map" ? (
        <Terrain3DMap 
        options={options}
        MapContainer={mapContainer}
        Zoom={zoom}
        setZoom={setZoom}
        Active={active}
        Longitude={lng}
        setLongitude={setLng}
        Latitude={lat}
        setLatitude={setLat}
        setMap={setMap}
        />
      ) : (
        <PlayGroundMap 
        options={options}
        MapContainer={mapContainer}
        Zoom={0.15||zoom}
        setZoom={setZoom}
        Active={active}
        Longitude={lng}
        setLongitude={setLng}
        Latitude={lat}
        setLatitude={setLat}
        setMap={setMap}
        />
      )}

      <Legend active={active} stops={active.stops} />
      <Optionsfield
        options={options}
        property={active.property}
        changeState={changeState}
      />
    </div>
  );
}
