import React, { useState, useEffect, useRef } from 'react';
import {useMutation, useQuery, } from "@apollo/client";
import {ADJUST_ORDER_LINE, GET_ACTIVE_ORDER} from "../data/queries";
import {Link} from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler';
import CartDetailsTable from './cartDetailsTable'

function Cart() {
    const [sidebarClassname, setSidebarClassname] = useState('')
    const quantity = useRef(0);
    const id = useRef(0);
    // const [quantity, setQuantity] = useState(0);
    const { loading: activeOrderLoading, error: activeOrderError, data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);


    return (
        <OutsideClickHandler
            onOutsideClick={() => setSidebarClassname('')}
        >
            <div style={{zIndex: "100022"}} className={` position-fixed  cart-icon `}  >
                <h3 onClick={event => {sidebarClassname ? setSidebarClassname('') : setSidebarClassname('enter')}} className='pt-2 pl-1' >{activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.totalWithTax/100}$</h3>
                {/*<button onClick={event => {setSidebarClassname('enter')}} >testtesttesttesttesttesttesttest</button>*/}
            </div>
            <div className={`sidebar  ${sidebarClassname}`}>
                {/*<div style={{zIndex: "100022"}} className={`notransition position-absolute  cart${sidebarClassname}`}>*/}
                {/*    <h3 onClick={event => {sidebarClassname ? setSidebarClassname('') : setSidebarClassname('enter')}} className='pt-2 pl-1' >{activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.totalWithTax/100}$</h3>*/}
                {/*    /!*<button onClick={event => {setSidebarClassname('enter')}} >testtesttesttesttesttesttesttest</button>*!/*/}
                {/*</div>*/}
                <div className='navbar-div'>
                    <CartDetailsTable/>

                    </div>
                <Link className='checkout-button'   to="/checkout">
                    <button c onClick={e => {setSidebarClassname('')}} type="button">
                        Checkout
                    </button>
                </Link>
                </div>



        </OutsideClickHandler>

        // <div className="cart-container">
        //     {cartItems}
        //     <Link to="/checkout">
        //         <button type="button">
        //             Checkout
        //         </button>
        //     </Link>
        // </div>
    )
}

export default Cart