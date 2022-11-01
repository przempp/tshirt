import React from 'react';

import Main from './pages/main/main'
// @ts-expect-error TS(6142): Module './components/navbar/navbar' was resolved t... Remove this comment to see the full error message
import Navbar from "./components/navbar/navbar";
import About from './pages/about/about'
// @ts-expect-error TS(6142): Module './pages/shipping/shipping' was resolved to... Remove this comment to see the full error message
import Shipping from './pages/shipping/shipping'
// @ts-expect-error TS(6142): Module './pages/tshirts/tshirt' was resolved to '/... Remove this comment to see the full error message
import TshirtPage from './pages/tshirts/tshirt'
// @ts-expect-error TS(6142): Module './components/cart/cart' was resolved to '/... Remove this comment to see the full error message
import Cart from './components/cart/cart'
import Footer from './components/footer/footer'
import './App.css';
// @ts-expect-error TS(6142): Module './pages/checkout/checkout' was resolved to... Remove this comment to see the full error message
import Checkout from "./pages/checkout/checkout";
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";


function App() {
    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <BrowserRouter>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="bg-container">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="container main pt-4  ">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Cart/>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Navbar/>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Routes>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path="/" element={<Main/>}/>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path="/about" element={<About/>}/>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path="/shipping" element={<Shipping/>}/>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path="/tshirts/:id" element={<TshirtPage/>}/>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Route path="/checkout" element={<Checkout/>}/>
                    </Routes>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Footer/>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
