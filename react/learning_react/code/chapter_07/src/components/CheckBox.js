import React, { useReducer } from 'react';

function CheckBox() {
  const [checked, toggle]  = useReducer(checked => !checked, false);
  return (
    <>
      <input type="checkbox" value={checked} onChange={toggle} />
      {checked ? 'checked' : 'not checked'}
    </>
  )
}
export default CheckBox;