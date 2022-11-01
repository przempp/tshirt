import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Main from './pages/main/main';
import Navbar from "./components/navbar/navbar";
import About from './pages/about/about';
import Shipping from './pages/shipping/shipping';
import TshirtPage from './pages/tshirts/tshirt';
import Cart from './components/cart/cart';
import Footer from './components/footer/footer';
import './App.css';
import Checkout from "./pages/checkout/checkout";
import { BrowserRouter, Routes, Route, } from "react-router-dom";
function App() {
    return (_jsx(BrowserRouter, { children: _jsx("div", Object.assign({ className: "bg-container" }, { children: _jsxs("div", Object.assign({ className: "container main pt-4  " }, { children: [_jsx(Cart, {}), _jsx(Navbar, {}), _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Main, {}) }), _jsx(Route, { path: "/about", element: _jsx(About, {}) }), _jsx(Route, { path: "/shipping", element: _jsx(Shipping, {}) }), _jsx(Route, { path: "/tshirts/:id", element: _jsx(TshirtPage, {}) }), _jsx(Route, { path: "/checkout", element: _jsx(Checkout, {}) })] }), _jsx(Footer, {})] })) })) }));
}
export default App;
