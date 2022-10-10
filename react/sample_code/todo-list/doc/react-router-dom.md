# react-router-dom
https://reactrouter.com/en/main


### install
npm install react-router-dom

### create and render a browser router
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


// router 관련 이관
import { createBrowserRouter, RouterProvider, Router } from 'react-router-dom';
import ErrorPage from 'src/pages/error-page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage></ErrorPage>
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
```