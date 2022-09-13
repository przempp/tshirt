import logo from './logo.svg';
import React, { useState } from 'react';

import TshirtsDirectory from './content/main/mainpage'
import Navbar from "./content/navbar/navbar";
import About from './content/about/about'
import Shipping from './content/shipping/shipping'
import TshirtPage from './content/tshirts/tshirt'
import './App.css';
import {
    BrowserRouter,
    Routes,
    Route,
    useParams
} from "react-router-dom";

function App() {
 let id = useParams()
  return (
      <BrowserRouter>
          <div className="bg-container">
          <div className="container main pt-4  ">
              <Navbar/>
              <Routes>
                  <Route path="/" element={<TshirtsDirectory/>} />
                  <Route path="/about" element={<About/>} />
                  <Route path="/shipping" element={<Shipping/>} />
                  <Route path="/tshirts/:id" element={<TshirtPage/>} />
              </Routes>
          </div>
          </div>
      </BrowserRouter>
  );
}

export default App;
