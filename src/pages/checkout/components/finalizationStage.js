"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
function FinalizationStage(success, addPaymentData) {
    console.log(success);
    return ((success === true && addPaymentData && addPaymentData.addPaymentToOrder) ?
        (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-12 pl-0 text-center align-self-baseline' }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "PAYMENT SUCCESSFUL!" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Your order id is: ", addPaymentData && addPaymentData.addPaymentToOrder.code] })] }))
        : (addPaymentData && addPaymentData.addPaymentToOrder) && (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-12 pl-0 text-center align-self-baseline' }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "PAYMENT ERROR!" }), (0, jsx_runtime_1.jsx)("p", { children: addPaymentData && addPaymentData.addPaymentToOrder.message })] })));
}
exports.default = FinalizationStage;
