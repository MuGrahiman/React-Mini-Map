import * as React from "react";
import { useState, useEffect, useMemo } from "react";
import MapGL, { Source, Layer, NavigationControl } from "react-map-gl";
import ControlPanel from "../components/ControlPanel";
import { HeatmapLayer } from "../Layers/HeatLayer";

// MapGL.workerClass = MapboxWorker;


const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAX_ZOOM_LEVEL = 9;

function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature) => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return { type: "FeatureCollection", features };
}

export default function HeatMap({
  Options,
  MapContainer,
  Longitude,
  Latitude,
  Zoom,
  Active,
  setMap,
  setLongitude,
  setLatitude,
  setZoom,
}) {
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    return allDays
      ? earthquakes
      : filterFeaturesByDay(earthquakes, selectedTime);
  }, [earthquakes, allDays, selectedTime]);

  // Handle changes in the map's viewport and call the callback function
  const handleViewportChange = (newViewport) => {
    console.log(newViewport.viewState.longitude.toFixed(4));
    setLongitude(newViewport.viewState.longitude.toFixed(4));
    setLatitude(newViewport.viewState.latitude.toFixed(4));
    setZoom(newViewport.viewState.zoom.toFixed(2));
  };

  return (
    <>
      <MapGL
        initialViewState={{
          latitude: Latitude,
          longitude: Longitude, 
          zoom: Zoom,
        }}
        onMove={handleViewportChange}
        style={{ height: "100vh" }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        {data && (
          <Source type="geojson" data={data}>
            <Layer {...HeatmapLayer} />
          </Source>
        )}
        <NavigationControl position="bottom-left" />
      </MapGL>
      <ControlPanel
        startTime={timeRange[0]}
        endTime={timeRange[1]}
        selectedTime={selectedTime}
        allDays={allDays}
        onChangeTime={selectTime}
        onChangeAllDays={useAllDays}
      />
    </>
  );
}
