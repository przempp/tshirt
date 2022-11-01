"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_select_1 = __importDefault(require("react-select"));
function ShippingMethod(shippingType, setShippingType, setShippingMethodStage, setPaymentMethodStage, setShippingMethod, shippingMethodsFormated, customStyles, cancelButton) {
    return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'form-group' }, { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'col-12 pl-0' }, { children: [(0, jsx_runtime_1.jsx)("label", Object.assign({ htmlFor: "inputShippingType" }, { children: "Select Shipping Method" })), (0, jsx_runtime_1.jsx)(react_select_1.default, { value: shippingType, onChange: e => {
                                setShippingType(e);
                            }, styles: customStyles, options: shippingMethodsFormated })] })) })), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'form-group d-flex justify-content-between' }, { children: [cancelButton(), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => {
                            setShippingMethod();
                            setShippingMethodStage(false);
                            setPaymentMethodStage(true);
                        }, className: "my-button small", disabled: (!shippingType), type: 'button' }, { children: "Set Shipping" }))] }))] }));
}
exports.default = ShippingMethod;
