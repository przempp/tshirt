import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_ACTIVE_ORDER } from "../../data/queries";
import { Link } from 'react-router-dom';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import OutsideClickHandler from 'react-outside-click-handler';
import CartDetailsTable from './components/cartDetailsTable';
function Cart() {
    const [sidebarClassname, setSidebarClassname] = useState('');
    const { data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    return (_jsxs(OutsideClickHandler, Object.assign({ onOutsideClick: () => setSidebarClassname('') }, { children: [_jsx("div", Object.assign({ style: { zIndex: "100022" }, className: ` position-fixed  cart-icon ` }, { children: _jsxs("h3", Object.assign({ onClick: () => { sidebarClassname ? setSidebarClassname('') : setSidebarClassname('enter'); }, className: 'pt-2 pl-1' }, { children: [(activeOrderData && activeOrderData.activeOrder) ? activeOrderData.activeOrder.totalWithTax / 100 : "0", "$"] })) })), _jsxs("div", Object.assign({ className: `sidebar  ${sidebarClassname}` }, { children: [_jsx("div", Object.assign({ className: 'navbar-div' }, { children: _jsx(CartDetailsTable, {}) })), activeOrderData && activeOrderData.activeOrder && (activeOrderData.activeOrder.totalQuantity !== 0) && _jsx(Link, Object.assign({ className: 'checkout-button', to: "/checkout" }, { children: _jsx("button", Object.assign({ className: 'my-button', onClick: e => { setSidebarClassname(''); }, type: "button" }, { children: "Checkout" })) }))] }))] }))
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
export default Cart;
