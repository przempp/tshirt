import React from 'react';
import Main from './pages/main/main'
import Navbar from "./components/navbar/navbar";
import About from './pages/about/about'
import Shipping from './pages/shipping/shipping'
import TshirtPage from './pages/tshirts/tshirt'
import Cart from './components/cart/cart'
import Footer from './components/footer/footer'
import './App.css';
import Checkout from "./pages/checkout/checkout";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
            <div className="bg-container">
                <div className="container main pt-4  ">
                    <Cart/>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Main/>}/>
                        <Route path="/about" element={<About/>}/>
                        <Route path="/shipping" element={<Shipping/>}/>
                        <Route path="/tshirts/:id" element={<TshirtPage/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                    </Routes>
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
