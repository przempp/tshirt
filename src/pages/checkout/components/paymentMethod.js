"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_bootstrap_1 = require("react-bootstrap");
function PaymentMethod(setPaymentMethodStage, setPaymentStage, setSelectedCrypto, selectedCrypto, setShippingAddress, shippingType, cancelButton) {
    return ((0, jsx_runtime_1.jsxs)(react_bootstrap_1.Form, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Pick payment option" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Check, { type: 'radio', id: `radio-btc`, label: `Bitcoin`, onChange: () => setSelectedCrypto('bitcoin'), checked: selectedCrypto === "bitcoin" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Check, { type: 'radio', id: `default-eth`, label: `Ethereum`, onChange: () => setSelectedCrypto('ethereum'), checked: selectedCrypto === "ethereum" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Check, { type: 'radio', id: `default-xmr`, label: `Monero`, onChange: () => setSelectedCrypto('monero'), checked: selectedCrypto === "monero" }), (0, jsx_runtime_1.jsx)(react_bootstrap_1.Form.Check, { type: 'radio', id: `default-ltc`, label: `Litecoin`, onChange: () => setSelectedCrypto('litecoin'), checked: selectedCrypto === "litecoin" }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'd-flex justify-content-between' }, { children: [cancelButton(), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: e => {
                            setShippingAddress();
                            setPaymentMethodStage(false);
                            setPaymentStage(true);
                        }, className: "my-button small", disabled: (!shippingType), type: 'button' }, { children: "Finalize" }))] }))] }));
}
exports.default = PaymentMethod;
