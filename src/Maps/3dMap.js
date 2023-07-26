import MapGL, { Source, Layer } from "react-map-gl";

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAX_ZOOM_LEVEL = 9;

const skylayer = (import("react-map-gl").SkyLayer = {
  id: "sky",
  type: "sky",
  paint: {
    "sky-type": "atmosphere",
    "sky-atmosphere-sun": [0.0, 0.0],
    "sky-atmosphere-sun-intensity": 15,
  },
});

export default function Terrain3DMap({
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
  return (
    <>
      <MapGL
        initialViewState={{
          latitude: 32.6141,
          longitude: -114.34411,
          zoom: 14,
          bearing: 80,
          pitch: 80,
        }}
        style={{height:'100vh'}}
        maxPitch={85}
        mapStyle="mapbox://styles/mapbox/satellite-v9"
        mapboxAccessToken={MAPBOX_TOKEN}
        terrain={{ source: "mapbox-dem", exaggeration: 1.5 }}
      >
        <Source
          id="mapbox-dem"
          type="raster-dem"
          url="mapbox://mapbox.mapbox-terrain-dem-v1"
          tileSize={512}
          maxzoom={14}
        />
        <Layer {...skylayer} />
      </MapGL>
    </>
  );
}
