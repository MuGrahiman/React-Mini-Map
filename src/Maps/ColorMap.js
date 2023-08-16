import React, { useEffect } from "react";
import mapboxgl from "!mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import data from '../json/data.json'




export default function ColorMap({Options,MapContainer,Longitude,Latitude,Zoom,Active,setMap}) {

  useEffect(() => {

    const map = new mapboxgl.Map({
      container: MapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [Longitude, Latitude],
      zoom: Zoom,
    });

    map.on("load", () => {
      map.addSource("countries", {
        type: "geojson",
        data,
      });

      map.setLayoutProperty("country-label", "text-field", [
        "format",
        ["get", "name_en"],
        { "font-scale": 1.2 },
        "\n",
        {},
        ["get", "name"],
        {
          "font-scale": 0.8,
          "text-font": [
            "literal",
            ["DIN Offc Pro Italic", "Arial Unicode MS Regular"],
          ],
        },
      ]);

      map.addLayer(
        {
          id: "countries",
          type: "fill",
          source: "countries",
        },
        "country-label"
      );

      map.setPaintProperty("countries", "fill-color", {
        property: Active.property,
        stops: Active.stops,
      });
    });


   
    setMap(map);

    // Clean up on unmount
    return () => map.remove();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Active]);

  return <div ref={MapContainer} className="map-container" />;
}
