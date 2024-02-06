import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store, persistor } from './redux/store.js'; // Ensure persistor is also exported from your store configuration
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}> {/* Use PersistGate here */}
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
