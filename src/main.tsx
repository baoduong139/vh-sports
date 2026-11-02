import React from 'react';
import ReactDOM from 'react-dom/client';
import './init';
import '../products.js';
import '../icons.js';
import '../artboards.js';
import '../figma-components.js';
import App from './App';

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}

