import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import UserProvider from './components/context/UserProvider.js';
import AppContextProvider from './components/context/AppProvider.js';

import App from './App.js';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <UserProvider>
      <AppContextProvider>
        { 
        <App />
        }
      </AppContextProvider>
    </UserProvider>
  </BrowserRouter>,
  document.getElementById('root')
)