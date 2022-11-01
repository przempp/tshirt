import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function CustomerPays(activeOrderData, secondsSinceOrderPlaced, selectedCrypto, storeCryptoAddresses, setTransactionID, addPayment, setCustomerPaysStage, setFinalStage, setCustomerDetailsStage, editButton, cancelButton) {
    return (_jsxs("div", Object.assign({ className: 'col-12 pl-0 align-self-baseline' }, { children: [_jsx("h2", { children: "PAYMENT DETAILS:" }), (() => {
                let date = new Date(0);
                date.setSeconds(secondsSinceOrderPlaced);
                let timeString = date.toISOString().substring(11, 19);
                return (_jsxs("p", { children: ["Time left to pay: ", timeString, "."] }));
            })(), _jsxs("p", { children: [selectedCrypto, " price when order was placed: ", activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice, "$"] }), _jsxs("p", { children: ["Amount to pay: ", 1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100), " (", Math.round(1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100) * activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice), "$)"] }), _jsx("p", {}), _jsxs("p", Object.assign({ className: 'mb-0' }, { children: ["SEND ", selectedCrypto, " TO THIS ADDRESS: "] })), _jsxs("p", Object.assign({ style: { textTransform: 'none' } }, { children: [" ", storeCryptoAddresses[selectedCrypto], " "] })), _jsx("label", { children: "Paste in the transaction ID" }), _jsx("input", { onChange: e => setTransactionID(e.target.value), type: "text", className: "form-control", style: { textTransform: 'none' }, "aria-label": "Small", "aria-describedby": "inputGroup-sizing-sm" }), _jsxs("div", Object.assign({ className: 'text-center d-flex flex-column text-center' }, { children: [_jsx("div", Object.assign({ style: { margin: '5px' } }, { children: _jsx("button", Object.assign({ type: 'button', className: 'my-button', onClick: e => {
                                addPayment();
                                setCustomerPaysStage(false);
                                setFinalStage(true);
                                setCustomerDetailsStage(false);
                            } }, { children: "FINALIZE AND PAY!" })) })), _jsxs("div", { children: [_jsxs("span", Object.assign({ style: { margin: '2.5px' } }, { children: [" ", cancelButton(), " "] })), _jsxs("span", Object.assign({ style: { margin: '2.5px' } }, { children: [" ", editButton(setCustomerPaysStage), " "] }))] })] }))] })));
}
export default CustomerPays;
