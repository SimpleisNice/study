import React, { useState } from 'react';
import colorData from '../static/color-data.json';
import ColorList from './ColorList';
import AddColorForm from './AddColorForm';
import { v4 } from 'uuid';

export default function ColorForm() {
  const [colors, setColors] = useState(colorData.colors);

  return (
    <>
      <AddColorForm
        onNewColor={(title, color) => {
          console.log(title, color)

          const newColors = [
            ...colors,
            {
              id: v4(),
              rating: 0,
              title: title.value,
              color: color.value
            }
          ];
          setColors(newColors);
        }}
      />
      <ColorList 
        colors={colors}
        onRateColor={(id, rating) => {
          const newColors = colors.map(color => 
            color.id === id ? { ...color, rating } : color
          );
          setColors(newColors)
        }}
        onRemoveColor={id => {
          const newColors = colors.filter(color => color.id !== id);
          setColors(newColors);
        }}
      />
    </>
  )
}