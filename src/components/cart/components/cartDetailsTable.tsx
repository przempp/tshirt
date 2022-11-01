import React from "react";
import {useMutation, useQuery} from "@apollo/client";
import {ADJUST_ORDER_LINE, GET_ACTIVE_ORDER} from "../../../data/queries";


function CartDetailsTable({showButtons = true, animate = true, responsive = false}) {
    // console.log(showButtons)
    const { data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    const [adjustOrderLine] = useMutation(ADJUST_ORDER_LINE,
        {refetchQueries: [{ query: GET_ACTIVE_ORDER }]})
    let cartItems = []
    activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines.forEach((item: any) => {
            cartItems.push(

                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <tr>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <td><img alt='product' className='cart-product-image' src={`${item.featuredAsset.preview}?preset=thumb`} /></td>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <td style={{minWidth: '100px', maxWidth: '300px' }}>{item.productVariant.name}</td>
                  {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <td>
                      {showButtons &&
                        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                        <button className='my-button small' onClick={() => {
                            adjustOrderLine({ variables: {
                                    orderLineId:item.id, quantity: item.quantity + 1 } })}
                        }
                        >
                            +
                        </button>
                      }
                    </td>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <td>{item.quantity} </td>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <td>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {showButtons && <button className='my-button small' onClick={() => {
                            adjustOrderLine({ variables: {
                                    orderLineId:item.id, quantity: item.quantity - 1 } })}
                        }
                        >
                            -
                        </button>}

                    </td>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <td>{item.linePriceWithTax/100}$</td>

                </tr>
            )
            item.customFields.backDesign && cartItems.push(
                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                <tr >
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <td style={{borderTop: 'none'}} className='text-left' colspan="6">+ Custom Back: {item.customFields.backDesign}</td>
                </tr>
            )
    })
    if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines) {
        if (activeOrderData.activeOrder.shippingWithTax) cartItems.push(
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <tr>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <td  className='text-right pb-0 mb-0' colSpan="6">+ Shipping: {activeOrderData.activeOrder.shippingWithTax/100}$</td>
            </tr>)
        cartItems.push(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <tr>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <td style={{borderTop: `${activeOrderData.activeOrder.shippingWithTax ? "none" : ""}` }} className='text-right' colSpan="6">Total: {activeOrderData.activeOrder.totalWithTax/100}$</td>
        </tr>
    )
    }
    return(
    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <nav className={`scrollbar ${responsive ? "table-responsive" : ''}`}>
        {cartItems.length
            ? // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <div className={`${animate ? 'animation-chill' : ''} ${responsive ? '' : 'table-div-cart'} `} ><table className="table" >{cartItems}</table></div>
            : // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <h3 className={`${animate && 'animation-chill'} table-div-cart text-center pt-5`  } >No products in cart.</h3>
        }
    </nav>
    )
}

export default CartDetailsTable