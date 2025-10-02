// src/main.jsx

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { DataProvider } from './contexts/DataProvider.jsx'; // 1. Importe o DataProvider
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <DataProvider> {/* 2. Envolva o App com o DataProvider */}
        <App />
      </DataProvider>
    </BrowserRouter>
  </React.StrictMode>,
);