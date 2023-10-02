import React from 'react';
import { FaStar } from 'react-icons/fa';

const createArray = length => [...Array(length)];
const Star = ({ selected = false, onSelect = f => f}) => (
  <FaStar color={selected ? 'red' : 'grey'} onClick={onSelect} /> 
)

export default function StarRating({
  totalStars=5,
  selectedStars=0,
  onRate= f => f
}) {
  return (
    <>
      {createArray(totalStars).map((n, i) => (
        <Star
          key={i}
          selected={ selectedStars > i }
          onSelect={ () => onRate(i + i)}
        />
      ))}
      <p>
        {selectedStars} / {totalStars}
      </p>
    </>
  )
}