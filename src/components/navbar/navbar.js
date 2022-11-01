"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
function Navbar(id) {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "navbar d-flex justify-content-center align-items-center flex-column " }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "logo-div row  " }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ to: '/' }, { children: (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "animation" }, { children: (0, jsx_runtime_1.jsx)("h1", Object.assign({ className: 'logo-text col-xl text-3d-animation' }, { children: "ENJOY THE DECLINE" })) })) })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'menu row' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'menu-item col-4' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ className: ({ isActive }) => isActive ? "navlink-active" : "", to: "/" }, { children: "Shirts" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'menu-item col-4' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ className: ({ isActive }) => isActive ? "navlink-active" : "", to: "/shipping" }, { children: "Shipping" })) })), (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'menu-item col-4' }, { children: (0, jsx_runtime_1.jsx)(react_router_dom_1.NavLink, Object.assign({ className: ({ isActive }) => isActive ? "navlink-active" : "", to: "/about" }, { children: "About" })) }))] }))] })));
}
exports.default = Navbar;
