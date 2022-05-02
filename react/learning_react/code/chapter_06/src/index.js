import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import colors from './static/color-data.json';
import App from './App';

export const ColorContext = createContext();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ColorContext.Provider value={{ colors }}>
      <App />
  </ColorContext.Provider>
);