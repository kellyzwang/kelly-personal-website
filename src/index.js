import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './components/App';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAr2Wv06R74GipsSRPS3U9zLIFR-OHW8xU",
  authDomain: "kelly-z-wang.firebaseapp.com",
  databaseURL: "https://kelly-z-wang-default-rtdb.firebaseio.com",
  projectId: "kelly-z-wang",
  storageBucket: "kelly-z-wang.appspot.com",
  messagingSenderId: "509962909359",
  appId: "1:509962909359:web:2b503228ef45e4fd38065a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
);
