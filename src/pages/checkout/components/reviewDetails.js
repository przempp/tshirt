"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function ReviewDetails(activeOrderData, transitionToPayment, setShippingAddress, setPaymentStage, setCustomerPaysStage, cancelButton, editButton) {
    return ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'row' }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-md-12 col-lg-6 d-flex flex-column pl-lg-4 pb-3' }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "SHIPPING INFO" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pb-0 mb-0' }, { children: activeOrderData.activeOrder.shippingAddress.fullName })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pb-0 mb-0' }, { children: activeOrderData.activeOrder.shippingAddress.streetLine1 })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pb-0 mb-0' }, { children: activeOrderData.activeOrder.shippingAddress.streetLine2 })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pb-0 mb-0' }, { children: `${activeOrderData.activeOrder.shippingAddress.city}, ${activeOrderData.activeOrder.shippingAddress.postalCode}` })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pb-0 mb-0' }, { children: `${activeOrderData.activeOrder.shippingAddress.province} - ${activeOrderData.activeOrder.shippingAddress.country}` }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-md-12 col-lg-6 text-lg-right text-md-left d-flex flex-column' }, { children: [(0, jsx_runtime_1.jsx)("h3", { children: "CONTACT" }), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pb-0 mb-0' }, { children: activeOrderData.activeOrder.shippingAddress.company })), (0, jsx_runtime_1.jsx)("p", Object.assign({ className: 'pb-0 mb-0' }, { children: activeOrderData.activeOrder.shippingAddress.phoneNumber })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: 'mt-2' }, { children: ["Payment with: ", activeOrderData.activeOrder.shippingAddress.customFields.paymentType] }))] }))] })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'text-center d-flex flex-column text-center' }, { children: [(0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ style: { margin: '5px' }, type: 'button', className: 'my-button', onClick: e => {
                                transitionToPayment();
                                setShippingAddress();
                                // console.log('Zmiana na arranging payment POSZLA!')
                                setPaymentStage(false);
                                setCustomerPaysStage(true);
                            } }, { children: "FINALIZE AND PAY!" })) }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ style: { margin: '2.5px' } }, { children: [" ", cancelButton(), " "] })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ style: { margin: '2.5px' } }, { children: [" ", editButton(setPaymentStage), " "] }))] })] }))] }));
}
exports.default = ReviewDetails;
