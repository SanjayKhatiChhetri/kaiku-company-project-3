import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import Generalobservation from './pages/Generalobservation';
import Projectobservation from './pages/Projectobservation';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';

import './registration.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Homepage/>} />
      <Route path='/Generalobservation' element={<Generalobservation/>} />
      <Route path='/Projectobservation' element={<Projectobservation/>} />
    </Routes>
  
  </BrowserRouter>
    
  
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
