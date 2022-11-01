import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Form } from "react-bootstrap";
function PaymentMethod(setPaymentMethodStage, setPaymentStage, setSelectedCrypto, selectedCrypto, setShippingAddress, shippingType, cancelButton) {
    return (_jsxs(Form, { children: [_jsx("h2", { children: "Pick payment option" }), _jsx(Form.Check, { type: 'radio', id: `radio-btc`, label: `Bitcoin`, onChange: () => setSelectedCrypto('bitcoin'), checked: selectedCrypto === "bitcoin" }), _jsx(Form.Check, { type: 'radio', id: `default-eth`, label: `Ethereum`, onChange: () => setSelectedCrypto('ethereum'), checked: selectedCrypto === "ethereum" }), _jsx(Form.Check, { type: 'radio', id: `default-xmr`, label: `Monero`, onChange: () => setSelectedCrypto('monero'), checked: selectedCrypto === "monero" }), _jsx(Form.Check, { type: 'radio', id: `default-ltc`, label: `Litecoin`, onChange: () => setSelectedCrypto('litecoin'), checked: selectedCrypto === "litecoin" }), _jsxs("div", Object.assign({ className: 'd-flex justify-content-between' }, { children: [cancelButton(), _jsx("button", Object.assign({ onClick: e => {
                            setShippingAddress();
                            setPaymentMethodStage(false);
                            setPaymentStage(true);
                        }, className: "my-button small", disabled: (!shippingType), type: 'button' }, { children: "Finalize" }))] }))] }));
}
export default PaymentMethod;
