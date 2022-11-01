"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = require("@apollo/client");
const queries_1 = require("../../data/queries");
const react_router_dom_1 = require("react-router-dom");
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
const react_outside_click_handler_1 = __importDefault(require("react-outside-click-handler"));
const cartDetailsTable_1 = __importDefault(require("./components/cartDetailsTable"));
function Cart() {
    const [sidebarClassname, setSidebarClassname] = (0, react_1.useState)('');
    const { data: activeOrderData } = (0, client_1.useQuery)(queries_1.GET_ACTIVE_ORDER);
    return ((0, jsx_runtime_1.jsxs)(react_outside_click_handler_1.default, Object.assign({ onOutsideClick: () => setSidebarClassname('') }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { zIndex: "100022" }, className: ` position-fixed  cart-icon ` }, { children: (0, jsx_runtime_1.jsxs)("h3", Object.assign({ onClick: () => { sidebarClassname ? setSidebarClassname('') : setSidebarClassname('enter'); }, className: 'pt-2 pl-1' }, { children: [(activeOrderData && activeOrderData.activeOrder) ? activeOrderData.activeOrder.totalWithTax / 100 : "0", "$"] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: `sidebar  ${sidebarClassname}` }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'navbar-div' }, { children: (0, jsx_runtime_1.jsx)(cartDetailsTable_1.default, {}) })), activeOrderData && activeOrderData.activeOrder && (activeOrderData.activeOrder.totalQuantity !== 0) && (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, Object.assign({ className: 'checkout-button', to: "/checkout" }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button', onClick: e => { setSidebarClassname(''); }, type: "button" }, { children: "Checkout" })) }))] }))] }))
    // <div className="cart-container">
    //     {cartItems}
    //     <Link to="/checkout">
    //         <button type="button">
    //             Checkout
    //         </button>
    //     </Link>
    // </div>
    );
}
exports.default = Cart;
