import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { RoutesSetup } from './Routes/RoutesSetup.jsx';
import { RouterProvider } from 'react-router';
import myStore from './Store/store.js';
import { Provider } from 'react-redux';
createRoot(document.getElementById('root')).render(
  <Provider store={myStore}>
    <RouterProvider router={RoutesSetup}>
      <StrictMode>
        <App />
      </StrictMode>
    </RouterProvider>
  </Provider>
);
