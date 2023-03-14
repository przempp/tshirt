import React, { useState } from 'react';
import {useQuery} from "@apollo/client";
import {GET_ACTIVE_ORDER} from "../../data/queries";
import {Link} from 'react-router-dom'
import OutsideClickHandler from 'react-outside-click-handler';
import CartDetailsTable from './components/cartDetailsTable'

function Cart() {
    const [sidebarClassname, setSidebarClassname] = useState('')
    const {data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    return (
        <OutsideClickHandler
            onOutsideClick={() => setSidebarClassname('')}
        >
            <div style={{zIndex: "100022"}} className={` position-fixed  cart-icon `}  >
                <h3 onClick={() => {sidebarClassname ? setSidebarClassname('') : setSidebarClassname('enter')}} className='pt-2 pl-1' >{(activeOrderData && activeOrderData.activeOrder) ? activeOrderData.activeOrder.totalWithTax/100 : "0"}$</h3>
            </div>
            <div className={`sidebar  ${sidebarClassname}`}>
                <div className='navbar-div'>
                    <CartDetailsTable/>

                    </div>
                {activeOrderData && activeOrderData.activeOrder && (activeOrderData.activeOrder.totalQuantity !== 0) && <Link className='checkout-button'   to="/checkout">
                    <button className='my-button' onClick={e => {setSidebarClassname('')}} type="button">
                        Checkout
                    </button>
                </Link>}
                </div>



        </OutsideClickHandler>
    )
}

export default Cart