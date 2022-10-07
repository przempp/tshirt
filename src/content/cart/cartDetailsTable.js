import React from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ADJUST_ORDER_LINE, GET_ACTIVE_ORDER} from "../data/queries";


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
                        <button onClick={() => {
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
                        {showButtons && <button onClick={() => {
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
                    <td style={{borderTop: 'none'}} colspan="6" scope="col" >+ Custom Back: {item.customFields.backDesign}</td>
                </tr>
            )
        }



    )

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