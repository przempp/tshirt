import React, { useState } from 'react';
import {useQuery} from "@apollo/client";
import {GET_ACTIVE_ORDER} from "../../data/queries";
import {Link} from 'react-router-dom'
// @ts-expect-error TS(7016): Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import OutsideClickHandler from 'react-outside-click-handler';
// @ts-expect-error TS(6142): Module './components/cartDetailsTable' was resolve... Remove this comment to see the full error message
import CartDetailsTable from './components/cartDetailsTable'

function Cart() {
    const [sidebarClassname, setSidebarClassname] = useState('')
    const {data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);


    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <OutsideClickHandler
            onOutsideClick={() => setSidebarClassname('')}
        >
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div style={{zIndex: "100022"}} className={` position-fixed  cart-icon `}  >
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h3 onClick={() => {sidebarClassname ? setSidebarClassname('') : setSidebarClassname('enter')}} className='pt-2 pl-1' >{(activeOrderData && activeOrderData.activeOrder) ? activeOrderData.activeOrder.totalWithTax/100 : "0"}$</h3>
                {/*<button onClick={event => {setSidebarClassname('enter')}} >testtesttesttesttesttesttesttest</button>*/}
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className={`sidebar  ${sidebarClassname}`}>
                {/*<div style={{zIndex: "100022"}} className={`notransition position-absolute  cart${sidebarClassname}`}>*/}
                {/*    <h3 onClick={event => {sidebarClassname ? setSidebarClassname('') : setSidebarClassname('enter')}} className='pt-2 pl-1' >{activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.totalWithTax/100}$</h3>*/}
                {/*    /!*<button onClick={event => {setSidebarClassname('enter')}} >testtesttesttesttesttesttesttest</button>*!/*/}
                {/*</div>*/}
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='navbar-div'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <CartDetailsTable/>

                    </div>
                {/*{activeOrderData && console.log(activeOrderData)}*/}
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {activeOrderData && activeOrderData.activeOrder && (activeOrderData.activeOrder.totalQuantity !== 0) && <Link className='checkout-button'   to="/checkout">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button className='my-button' onClick={e => {setSidebarClassname('')}} type="button">
                        Checkout
                    </button>
                </Link>}
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