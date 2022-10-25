import React from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ADJUST_ORDER_LINE, GET_ACTIVE_ORDER} from "../../../data/queries";


function CartDetailsTable({showButtons = true, animate = true, responsive = false}) {
    // console.log(showButtons)
    const { loading: activeOrderLoading, error: activeOrderError, data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    const [adjustOrderLine, { loading: adjustLoading, error: adjustError, data: adjustItemData }] = useMutation(ADJUST_ORDER_LINE,
        {refetchQueries: [{ query: GET_ACTIVE_ORDER }]})
    let cartItems = []
    activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines.map(item => {
            // console.log(item)
            cartItems.push(

                <tr>
                    <td scope="col" ><img className='cart-product-image' src={`${item.featuredAsset.preview}?preset=thumb`} /></td>
                    <td  scope="col" style={{minWidth: '100px', maxWidth: '300px' }}>{item.productVariant.name}</td>
                  <td scope="col" >
                      {showButtons &&
                        <button className='my-button small' onClick={() => {
                            adjustOrderLine({ variables: {
                                    orderLineId:item.id, quantity: item.quantity + 1 } })}
                        }
                        >
                            +
                        </button>
                      }
                    </td>
                    <td scope="col" >{item.quantity} </td>
                    <td scope="col" >
                        {showButtons && <button className='my-button small' onClick={() => {
                            adjustOrderLine({ variables: {
                                    orderLineId:item.id, quantity: item.quantity - 1 } })}
                        }
                        >
                            -
                        </button>}

                    </td>
                    <td scope="col">{item.linePriceWithTax/100}$</td>

                </tr>
            )
            item.customFields.backDesign && cartItems.push(
                <tr >
                    <td style={{borderTop: 'none'}} className='text-left' colspan="6" scope="col" >+ Custom Back: {item.customFields.backDesign}</td>
                </tr>
            )
        }



    )
    if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines) {
        if (activeOrderData.activeOrder.shippingWithTax) cartItems.push(
            <tr>
                <td  className='text-right pb-0 mb-0' colSpan="6" scope="col">+ Shipping: {activeOrderData.activeOrder.shippingWithTax/100}$</td>
            </tr>)
        cartItems.push(
        <tr>
            <td style={{borderTop: `${activeOrderData.activeOrder.shippingWithTax ? "none" : ""}` }} className='text-right' colSpan="6" scope="col">Total: {activeOrderData.activeOrder.totalWithTax/100}$</td>
        </tr>
    )
    }
    return(
    <nav className={`scrollbar ${responsive ? "table-responsive" : ''}`}>
        {cartItems.length
            ? <div className={`${animate ? 'animation-chill' : ''} ${responsive ? '' : 'table-div-cart'} `} ><table className="table" >{cartItems}</table></div>
            : <h3 className={`${animate && 'animation-chill'} table-div-cart text-center pt-5`  } >No products in cart.</h3>
        }
    </nav>
    )
}

export default CartDetailsTable