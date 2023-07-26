import React, { useEffect, useMemo, useState } from "react";
import Map, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
  ScaleControl,
} from "react-map-gl";
import StyleControls from "../components/PGControlPanel";
import MAP_STYLE from "../json/map-style-basic-v8.json";
import Pin from "../components/Pin";
import FormPage from "../FormPage";
import POP from "../components/Pop";

// Set your mapbox token here
const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
function PlayGroundMap({
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
  const [mapStyle, setMapStyle] = useState(null);
  const [formPage, setFormPage] = useState(false);
  const [pop, setPop] = useState(false);
  const [popValue, setPopValue] = useState();
  const [formValue, setFormValue] = useState([]);

  // Handle changes in the map's viewport and call the callback function
  const handleViewportChange = (newViewport) => {
    setLongitude(newViewport.viewState.longitude.toFixed(4));
    setLatitude(newViewport.viewState.latitude.toFixed(4));
    setZoom(newViewport.viewState.zoom.toFixed(2));
  };
  console.log(formValue);
  const pins = useMemo(
    () =>
      formValue.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.Longitude}
          latitude={city.Latitude}
          anchor="bottom"
          onClick={(e) => {
            setPopValue(index)
            setPop(true)
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
          }}
        >
          <Pin />
        </Marker>
      )),
    [formValue]
  );
  return (
    <>
      {formPage && (
        <FormPage
          setForm={setFormPage}
          setFormValue={setFormValue}
          FormValue={formValue}
        />
      )}

      <Map
        initialViewState={{
          latitude: Latitude,
          longitude: Longitude,
          zoom: Zoom,
        }}
        mapStyle={mapStyle}
        style={{ height: "100vh" }}
        onMove={handleViewportChange}
        styleDiffing
        mapboxAccessToken={MAPBOX_TOKEN}
      >
        <ScaleControl position="top-left" />
        <GeolocateControl position="top-left" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />

        {pins}

      {pop && <POP Value={formValue} PopUp={popValue} setPop={setPop}/>}
      </Map>
      <StyleControls
        onChange={setMapStyle}
        setForm={setFormPage}
        Form={formPage}
      />
    </>
  );
}

export default PlayGroundMap;
