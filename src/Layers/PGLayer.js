import React from 'react';
import MAP_STYLE from '../json/map-style-basic-v8.json';


const categories = ['labels', 'roads', 'buildings', 'parks', 'water', 'background'];

const layerSelector = {
  background: /background/,
  water: /water/,
  parks: /park/,
  buildings: /building/,
  roads: /bridge|road|tunnel/,
  labels: /label|place|poi/
};

const colorClass = {
  line: 'line-color',
  fill: 'fill-color',
  background: 'background-color',
  symbol: 'text-color'
};

export function getMapStyle({ visibility, color }) {
  const defaultMapStyle = MAP_STYLE;
  const defaultLayers = defaultMapStyle.layers;

  const layers = defaultLayers
    .filter(layer => {
      const id = layer.id;
      return categories.every(name => visibility[name] || !layerSelector[name].test(id));
    })
    .map(layer => {
      const id = layer.id;
      const type = layer.type;
      const category = categories.find(name => layerSelector[name].test(id));
      if (category && colorClass[type]) {
        return { ...layer, paint: { ...layer.paint, [colorClass[type]]: color[category] } };
      }
      return layer;
    });

  return { ...defaultMapStyle, layers };
}
