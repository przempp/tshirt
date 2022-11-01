"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const client_1 = require("@apollo/client");
const queries_1 = require("../../../data/queries");
function CartDetailsTable({ showButtons = true, animate = true, responsive = false }) {
    // console.log(showButtons)
    const { data: activeOrderData } = (0, client_1.useQuery)(queries_1.GET_ACTIVE_ORDER);
    const [adjustOrderLine] = (0, client_1.useMutation)(queries_1.ADJUST_ORDER_LINE, { refetchQueries: [{ query: queries_1.GET_ACTIVE_ORDER }] });
    let cartItems = [];
    activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines.forEach((item) => {
        cartItems.push((0, jsx_runtime_1.jsxs)("tr", { children: [(0, jsx_runtime_1.jsx)("td", { children: (0, jsx_runtime_1.jsx)("img", { alt: 'product', className: 'cart-product-image', src: `${item.featuredAsset.preview}?preset=thumb` }) }), (0, jsx_runtime_1.jsx)("td", Object.assign({ style: { minWidth: '100px', maxWidth: '300px' } }, { children: item.productVariant.name })), (0, jsx_runtime_1.jsx)("td", { children: showButtons &&
                        (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button small', onClick: () => {
                                adjustOrderLine({ variables: {
                                        orderLineId: item.id, quantity: item.quantity + 1
                                    } });
                            } }, { children: "+" })) }), (0, jsx_runtime_1.jsxs)("td", { children: [item.quantity, " "] }), (0, jsx_runtime_1.jsx)("td", { children: showButtons && (0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button small', onClick: () => {
                            adjustOrderLine({ variables: {
                                    orderLineId: item.id, quantity: item.quantity - 1
                                } });
                        } }, { children: "-" })) }), (0, jsx_runtime_1.jsxs)("td", { children: [item.linePriceWithTax / 100, "$"] })] }));
        item.customFields.backDesign && cartItems.push((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsxs)("td", Object.assign({ style: { borderTop: 'none' }, className: 'text-left', colspan: "6" }, { children: ["+ Custom Back: ", item.customFields.backDesign] })) }));
    });
    if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.lines) {
        if (activeOrderData.activeOrder.shippingWithTax)
            cartItems.push((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsxs)("td", Object.assign({ className: 'text-right pb-0 mb-0', colSpan: "6" }, { children: ["+ Shipping: ", activeOrderData.activeOrder.shippingWithTax / 100, "$"] })) }));
        cartItems.push((0, jsx_runtime_1.jsx)("tr", { children: (0, jsx_runtime_1.jsxs)("td", Object.assign({ style: { borderTop: `${activeOrderData.activeOrder.shippingWithTax ? "none" : ""}` }, className: 'text-right', colSpan: "6" }, { children: ["Total: ", activeOrderData.activeOrder.totalWithTax / 100, "$"] })) }));
    }
    return ((0, jsx_runtime_1.jsx)("nav", Object.assign({ className: `scrollbar ${responsive ? "table-responsive" : ''}` }, { children: cartItems.length
            ? (0, jsx_runtime_1.jsx)("div", Object.assign({ className: `${animate ? 'animation-chill' : ''} ${responsive ? '' : 'table-div-cart'} ` }, { children: (0, jsx_runtime_1.jsx)("table", Object.assign({ className: "table" }, { children: cartItems })) }))
            : (0, jsx_runtime_1.jsx)("h3", Object.assign({ className: `${animate && 'animation-chill'} table-div-cart text-center pt-5` }, { children: "No products in cart." })) })));
}
exports.default = CartDetailsTable;
