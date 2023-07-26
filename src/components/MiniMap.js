import React from 'react';
import ReactMapGL, {  Marker, useControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

function MiniMap({ lat, setLat, lng, setLng, updatePlaceName }) {
  const Geocoder = () => {
    const ctrl = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      marker: false,
      collapsed: true,
    });
    useControl(() => ctrl);
    ctrl.on('result', (e) => {
        const coords = e.result.geometry.coordinates;
        console.log(coords)
      setLng(coords[0]);
      setLat(coords[1]);
      getPlaceName(coords[1],coords[0])
    });
    return null;
  };

  const getPlaceName = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();
      console.log('Place data:', data);
      const placeName = data.features[0].place_name;
      console.log('Place Name:', placeName);
      updatePlaceName(placeName.split(',')); 
    } catch (error) {
      console.error('Error retrieving place name:', error);
    }
  };

  return (
    <ReactMapGL
      mapboxApiAccessToken={mapboxgl.accessToken}
      width="100%"
      height="100vh"
      latitude={lat}
      longitude={lng}
      zoom={6}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(viewport) => {
        console.log(viewport)
        setLat(viewport.latitude);
        setLng(viewport.longitude);
      }}
    >
      <Marker
        latitude={lat}
        longitude={lng}
        draggable
        
        onDragEnd={(e) => {
          console.log(e.lngLat.lat);
          console.log(e.lngLat.lng);
          setLat(e.lngLat.lat);
          setLng(e.lngLat.lng);
          getPlaceName(e.lngLat.lat, e.lngLat.lng);
        }}
      />
     
      <Geocoder />
    </ReactMapGL>
  );
}

export default MiniMap;