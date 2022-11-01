import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import Select from "react-select";
function ShippingMethod(shippingType, setShippingType, setShippingMethodStage, setPaymentMethodStage, setShippingMethod, shippingMethodsFormated, customStyles, cancelButton) {
    return (_jsxs(_Fragment, { children: [_jsx("div", Object.assign({ className: 'form-group' }, { children: _jsxs("div", Object.assign({ className: 'col-12 pl-0' }, { children: [_jsx("label", Object.assign({ htmlFor: "inputShippingType" }, { children: "Select Shipping Method" })), _jsx(Select, { value: shippingType, onChange: e => {
                                setShippingType(e);
                            }, styles: customStyles, options: shippingMethodsFormated })] })) })), _jsxs("div", Object.assign({ className: 'form-group d-flex justify-content-between' }, { children: [cancelButton(), _jsx("button", Object.assign({ onClick: () => {
                            setShippingMethod();
                            setShippingMethodStage(false);
                            setPaymentMethodStage(true);
                        }, className: "my-button small", disabled: (!shippingType), type: 'button' }, { children: "Set Shipping" }))] }))] }));
}
export default ShippingMethod;
