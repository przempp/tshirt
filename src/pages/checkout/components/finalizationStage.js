import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function FinalizationStage(success, addPaymentData) {
    console.log(success);
    return ((success === true && addPaymentData && addPaymentData.addPaymentToOrder) ?
        _jsxs("div", Object.assign({ className: 'col-12 pl-0 text-center align-self-baseline' }, { children: [_jsx("h2", { children: "PAYMENT SUCCESSFUL!" }), _jsxs("p", { children: ["Your order id is: ", addPaymentData && addPaymentData.addPaymentToOrder.code] })] }))
        : (addPaymentData && addPaymentData.addPaymentToOrder) && _jsxs("div", Object.assign({ className: 'col-12 pl-0 text-center align-self-baseline' }, { children: [_jsx("h2", { children: "PAYMENT ERROR!" }), _jsx("p", { children: addPaymentData && addPaymentData.addPaymentToOrder.message })] })));
}
export default FinalizationStage;
