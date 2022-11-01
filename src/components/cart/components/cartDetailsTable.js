import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useMutation, useQuery } from "@apollo/client";
import { ADJUST_ORDER_LINE, GET_ACTIVE_ORDER } from "../../../data/queries";
function CartDetailsTable({ showButtons = true, animate = true, responsive = false }) {
    // console.log(showButtons)
    const { data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    const [adjustOrderLine] = useMutation(ADJUST_ORDER_LINE, { refetchQueries: [{ query: GET_ACTIVE_ORDER }] });
    let cartItems = [];
    activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines.forEach((item) => {
        cartItems.push(_jsxs("tr", { children: [_jsx("td", { children: _jsx("img", { alt: 'product', className: 'cart-product-image', src: `${item.featuredAsset.preview}?preset=thumb` }) }), _jsx("td", Object.assign({ style: { minWidth: '100px', maxWidth: '300px' } }, { children: item.productVariant.name })), _jsx("td", { children: showButtons &&
                        _jsx("button", Object.assign({ className: 'my-button small', onClick: () => {
                                adjustOrderLine({ variables: {
                                        orderLineId: item.id, quantity: item.quantity + 1
                                    } });
                            } }, { children: "+" })) }), _jsxs("td", { children: [item.quantity, " "] }), _jsx("td", { children: showButtons && _jsx("button", Object.assign({ className: 'my-button small', onClick: () => {
                            adjustOrderLine({ variables: {
                                    orderLineId: item.id, quantity: item.quantity - 1
                                } });
                        } }, { children: "-" })) }), _jsxs("td", { children: [item.linePriceWithTax / 100, "$"] })] }));
        item.customFields.backDesign && cartItems.push(_jsx("tr", { children: _jsxs("td", Object.assign({ style: { borderTop: 'none' }, className: 'text-left', colspan: "6" }, { children: ["+ Custom Back: ", item.customFields.backDesign] })) }));
    });
    if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines) {
        if (activeOrderData.activeOrder.shippingWithTax)
            cartItems.push(_jsx("tr", { children: _jsxs("td", Object.assign({ className: 'text-right pb-0 mb-0', colSpan: "6" }, { children: ["+ Shipping: ", activeOrderData.activeOrder.shippingWithTax / 100, "$"] })) }));
        cartItems.push(_jsx("tr", { children: _jsxs("td", Object.assign({ style: { borderTop: `${activeOrderData.activeOrder.shippingWithTax ? "none" : ""}` }, className: 'text-right', colSpan: "6" }, { children: ["Total: ", activeOrderData.activeOrder.totalWithTax / 100, "$"] })) }));
    }
    return (_jsx("nav", Object.assign({ className: `scrollbar ${responsive ? "table-responsive" : ''}` }, { children: cartItems.length
            ? _jsx("div", Object.assign({ className: `${animate ? 'animation-chill' : ''} ${responsive ? '' : 'table-div-cart'} ` }, { children: _jsx("table", Object.assign({ className: "table" }, { children: cartItems })) }))
            : _jsx("h3", Object.assign({ className: `${animate && 'animation-chill'} table-div-cart text-center pt-5` }, { children: "No products in cart." })) })));
}
export default CartDetailsTable;
