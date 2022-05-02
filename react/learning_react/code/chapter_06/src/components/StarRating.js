import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const createArray = length => [...Array(length)];
const Star = ({ selected = false, onSelect = f => f}) => (
  <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} /> 
)

export default function StarRating({ style={}, totalStars=5 }) {
  const [selectedStars, setSelectedStars] = useState(0);
  return (
    <div style={{ padding: '5px', ...style }}>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={ selectedStars>i }
          onSelect={() => setSelectedStars(i + 1)}
        />
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </div>
  )
}