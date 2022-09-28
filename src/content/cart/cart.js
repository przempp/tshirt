import React, { useState, useEffect, useRef } from 'react';
import {useMutation, useQuery, } from "@apollo/client";
import {ADJUST_ORDER_LINE, GET_ACTIVE_ORDER} from "../data/queries";
import {Link} from 'react-router-dom'


function Cart() {
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
                <table className="table">
                        <thead>
                        <tr>
                            <th scope="col" ><img className='cart-product-image' src={item.featuredAsset.preview} /></th>
                            <th scope="col">{item.productVariant.name}</th>
                            <th scope="col">
                                <button onClick={() => {
                                    adjustOrderLine({ variables: {
                                        orderLineId:item.id, quantity: item.quantity + 1 } })}
                                }
                                >
                                    add
                                </button>
                            </th>
                            <th scope="col">{item.quantity}</th>
                            <th scope="col">
                                <button onClick={() => {
                                    adjustOrderLine({ variables: {
                                            orderLineId:item.id, quantity: item.quantity - 1 } })}
                                }
                                >
                                    remove
                                </button>
                            </th>
                            <th scope="col">{item.linePriceWithTax/100}$</th>



                        </tr>
                        </thead>
                </table>
            )
    }



    )
    return (
        <div className="cart-container">
            <h3 className='pt-2 pl-1' >{activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.totalWithTax/100}$</h3>
            {cartItems}
            <Link to="/checkout">
                <button type="button">
                    Checkout
                </button>
            </Link>
        </div>
    )
}

export default Cart