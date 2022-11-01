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
                        {/* @ts-expect-error TS(2786): 'Main' cannot be used as a JSX component. */}
                        <Route path="/" element={<Main/>}/>
                        {/* @ts-expect-error TS(2786): 'About' cannot be used as a JSX component. */}
                        <Route path="/about" element={<About/>}/>
                        <Route path="/shipping" element={<Shipping/>}/>
                        <Route path="/tshirts/:id" element={<TshirtPage/>}/>
                        <Route path="/checkout" element={<Checkout/>}/>
                    </Routes>
                    {/* @ts-expect-error TS(2786): 'Footer' cannot be used as a JSX component. */}
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
