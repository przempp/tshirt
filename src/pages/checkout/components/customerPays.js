"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function CustomerPays(activeOrderData, secondsSinceOrderPlaced, selectedCrypto, storeCryptoAddresses, setTransactionID, addPayment, setCustomerPaysStage, setFinalStage, setCustomerDetailsStage, editButton, cancelButton) {
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-12 pl-0 align-self-baseline' }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "PAYMENT DETAILS:" }), (() => {
                let date = new Date(0);
                date.setSeconds(secondsSinceOrderPlaced);
                let timeString = date.toISOString().substring(11, 19);
                return ((0, jsx_runtime_1.jsxs)("p", { children: ["Time left to pay: ", timeString, "."] }));
            })(), (0, jsx_runtime_1.jsxs)("p", { children: [selectedCrypto, " price when order was placed: ", activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice, "$"] }), (0, jsx_runtime_1.jsxs)("p", { children: ["Amount to pay: ", 1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100), " (", Math.round(1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100) * activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice), "$)"] }), (0, jsx_runtime_1.jsx)("p", {}), (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: 'mb-0' }, { children: ["SEND ", selectedCrypto, " TO THIS ADDRESS: "] })), (0, jsx_runtime_1.jsxs)("p", Object.assign({ style: { textTransform: 'none' } }, { children: [" ", storeCryptoAddresses[selectedCrypto], " "] })), (0, jsx_runtime_1.jsx)("label", { children: "Paste in the transaction ID" }), (0, jsx_runtime_1.jsx)("input", { onChange: e => setTransactionID(e.target.value), type: "text", className: "form-control", style: { textTransform: 'none' }, "aria-label": "Small", "aria-describedby": "inputGroup-sizing-sm" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'text-center d-flex flex-column text-center' }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ style: { margin: '5px' } }, { children: (0, jsx_runtime_1.jsx)("button", Object.assign({ type: 'button', className: 'my-button', onClick: e => {
                                addPayment();
                                setCustomerPaysStage(false);
                                setFinalStage(true);
                                setCustomerDetailsStage(false);
                            } }, { children: "FINALIZE AND PAY!" })) })), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("span", Object.assign({ style: { margin: '2.5px' } }, { children: [" ", cancelButton(), " "] })), (0, jsx_runtime_1.jsxs)("span", Object.assign({ style: { margin: '2.5px' } }, { children: [" ", editButton(setCustomerPaysStage), " "] }))] })] }))] })));
}
exports.default = CustomerPays;
