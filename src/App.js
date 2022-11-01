"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const main_1 = __importDefault(require("./pages/main/main"));
const navbar_1 = __importDefault(require("./components/navbar/navbar"));
const about_1 = __importDefault(require("./pages/about/about"));
const shipping_1 = __importDefault(require("./pages/shipping/shipping"));
const tshirt_1 = __importDefault(require("./pages/tshirts/tshirt"));
const cart_1 = __importDefault(require("./components/cart/cart"));
const footer_1 = __importDefault(require("./components/footer/footer"));
require("./App.css");
const checkout_1 = __importDefault(require("./pages/checkout/checkout"));
const react_router_dom_1 = require("react-router-dom");
function App() {
    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.BrowserRouter, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "bg-container" }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "container main pt-4  " }, { children: [(0, jsx_runtime_1.jsx)(cart_1.default, {}), (0, jsx_runtime_1.jsx)(navbar_1.default, {}), (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(main_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/about", element: (0, jsx_runtime_1.jsx)(about_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/shipping", element: (0, jsx_runtime_1.jsx)(shipping_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/tshirts/:id", element: (0, jsx_runtime_1.jsx)(tshirt_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/checkout", element: (0, jsx_runtime_1.jsx)(checkout_1.default, {}) })] }), (0, jsx_runtime_1.jsx)(footer_1.default, {})] })) })) }));
}
exports.default = App;
