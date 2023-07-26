import React, { useState, useEffect } from 'react';
import { getMapStyle } from '../Layers/PGLayer';

const categories = ['labels', 'roads', 'buildings', 'parks', 'water', 'background'];

function StyleControls(props) {
  const [visibility, setVisibility] = useState({
    water: true,
    parks: true,
    buildings: true,
    roads: true,
    labels: true,
    background: true,
  });

  const [color, setColor] = useState({
    water: '#DBE2E6',
    parks: '#E6EAE9',
    buildings: '#c0c0c8',
    roads: '#ffffff',
    labels: '#78888a',
    background: '#EBF0F0',
  });

  useEffect(() => {
    props.onChange(getMapStyle({ visibility, color }));
  }, [visibility, color]);

  const onColorChange = (name, value) => {
    setColor({ ...color, [name]: value });
  };

  const onVisibilityChange = (name, value) => {
    setVisibility({ ...visibility, [name]: value });
  };

  return (
    <div className="control-panel">
      <h3>Map Play Ground</h3>
      <p>Dynamically show/hide map layers and change color with mutable map style.</p>
    <div className='w-full px-0 mb-3'>
      <button className='w-full text-center text-lg font-serif transition ease-in-out delay-150 bg-gray-50 ring-1 rounded ring-gray-300 hover:-translate-y-1 hover:scale-110 hover:bg-blue-500 duration-300 ' onClick={()=>props.setForm(!props.Form)}>Add New Pin</button>
    </div>
      <hr />
      {categories.map(name => (
        <div key={name} className="input">
          <label>{name}</label>
          <input
            type="checkbox"
            checked={visibility[name]}
            onChange={evt => onVisibilityChange(name, evt.target.checked)}
          />
          <input
            type="color"
            value={color[name]}
            disabled={!visibility[name]}
            onChange={evt => onColorChange(name, evt.target.value)}
          />
        </div>
      ))}
    </div>
  );
}

export default React.memo(StyleControls);
