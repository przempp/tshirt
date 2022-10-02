import React, { useState, useEffect, useRef } from 'react';
import {useMutation, useQuery, } from "@apollo/client";
import {ADJUST_ORDER_LINE, GET_ACTIVE_ORDER} from "../data/queries";
import {Link} from 'react-router-dom'


function Cart() {
    const [sidebarClassname, setSidebarClassname] = useState('')
    const quantity = useRef(0);
    const id = useRef(0);

    // const [quantity, setQuantity] = useState(0);
    const { loading: activeOrderLoading, error: activeOrderError, data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    const [adjustOrderLine, { loading: adjustLoading, error: adjustError, data: adjustItemData }] = useMutation(ADJUST_ORDER_LINE,
        {refetchQueries: [{ query: GET_ACTIVE_ORDER }]})
    if (activeOrderData) console.log(activeOrderData)
    let cartItems = []
    activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines.map(item => {
            console.log(item)
            cartItems.push(

                        <tr>
                            <th scope="col" ><img className='cart-product-image' src={item.featuredAsset.preview} /></th>
                            <th scope="col" style={{minWidth: '100px', maxWidth: '300px' }}>{item.productVariant.name}</th>
                            <th scope="col" >
                                <button onClick={() => {
                                    adjustOrderLine({ variables: {
                                        orderLineId:item.id, quantity: item.quantity + 1 } })}
                                }
                                >
                                    +
                                </button>
                            </th>
                            <th scope="col" >{item.quantity} </th>
                            <th scope="col" >
                                <button onClick={() => {
                                    adjustOrderLine({ variables: {
                                            orderLineId:item.id, quantity: item.quantity - 1 } })}
                                }
                                >
                                    -
                                </button>
                            </th>
                            <th scope="col">{item.linePriceWithTax/100}$</th>
                        </tr>

            )
    }



    )
    return (
        <div>
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
                    <nav className="scrollbar  ">
                        <div className='animation-chill table-div-cart' >

                            <table className="table ">

                        {cartItems}
                            </table>
                        </div>

                    </nav>

                    </div>
                <Link className='checkout-button'   to="/checkout">
                    <button c onClick={e => {setSidebarClassname('')}} type="button">
                        Checkout
                    </button>
                </Link>
                </div>



        </div>

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