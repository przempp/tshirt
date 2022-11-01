"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const client_1 = require("@apollo/client");
const queries_1 = require("../../data/queries");
const cartDetailsTable_1 = __importDefault(require("../../components/cart/components/cartDetailsTable"));
const customerDetails_1 = __importDefault(require("./components/customerDetails"));
const shippingDetails_1 = __importDefault(require("./components/shippingDetails"));
const shippingMethod_1 = __importDefault(require("./components/shippingMethod"));
const paymentMethod_1 = __importDefault(require("./components/paymentMethod"));
const reviewDetails_1 = __importDefault(require("./components/reviewDetails"));
const finalizationStage_1 = __importDefault(require("./components/finalizationStage"));
const customerPays_1 = __importDefault(require("./components/customerPays"));
const coingecko_api_1 = __importDefault(require("@crypto-coffee/coingecko-api"));
function Checkout() {
    const [customerDetailsStage, setCustomerDetailsStage] = (0, react_1.useState)(true);
    const [shippingDetailsStage, setShippingDetailsStage] = (0, react_1.useState)(false);
    const [shippingMethodStage, setShippingMethodStage] = (0, react_1.useState)(false);
    const [paymentMethodStage, setPaymentMethodStage] = (0, react_1.useState)(false);
    const [paymentStage, setPaymentStage] = (0, react_1.useState)(false);
    const [customerPaysStage, setCustomerPaysStage] = (0, react_1.useState)(false);
    const [finalStage, setFinalStage] = (0, react_1.useState)(false);
    const [cryptoPrice, setCryptoPrice] = (0, react_1.useState)(0);
    const [secondsSinceOrderPlaced, setSecondsSinceOrderPlaced] = (0, react_1.useState)(0);
    const [selectedCrypto, setSelectedCrypto] = (0, react_1.useState)("bitcoin");
    const [shippingType, setShippingType] = (0, react_1.useState)(0);
    const [transactionID, setTransactionID] = (0, react_1.useState)('');
    const [firstName, setFirstName] = (0, react_1.useState)("");
    const [lastName, setLastName] = (0, react_1.useState)("");
    const [email, setEmail] = (0, react_1.useState)("");
    const [telegram, setTelegram] = (0, react_1.useState)("");
    const [address, setAddress] = (0, react_1.useState)("");
    const [address2, setAddress2] = (0, react_1.useState)("");
    const [city, setCity] = (0, react_1.useState)("");
    const [province, setProvince] = (0, react_1.useState)("");
    const [zip, setZip] = (0, react_1.useState)("");
    const [countryCode, setCountryCode] = (0, react_1.useState)("");
    const customStyles = {
        // @ts-expect-error TS(7006): Parameter 'provided' implicitly has an 'any' type.
        option: (provided, state) => (Object.assign(Object.assign({}, provided), { color: 'black' })),
        // @ts-expect-error TS(7006): Parameter 'provided' implicitly has an 'any' type.
        input: (provided, state) => (Object.assign(Object.assign({}, provided), { color: 'black' })),
        // @ts-expect-error TS(7006): Parameter 'provided' implicitly has an 'any' type.
        placeholder: (provided, state) => (Object.assign(Object.assign({}, provided), { color: 'black' })),
    };
    const storeCryptoAddresses = {
        bitcoin: 'btc_address',
        ethereum: 'eth_address',
        monero: 'xrm_address',
        litecoin: 'ltc_address'
    };
    (0, react_1.useEffect)(() => {
        if (customerPaysStage) {
            ;
            (() => __awaiter(this, void 0, void 0, function* () {
                try {
                    const coinGeckoApi = new coingecko_api_1.default();
                    const results = yield coinGeckoApi.simple({
                        ids: [selectedCrypto],
                        vs_currencies: 'usd'
                    });
                    setCryptoPrice(results[selectedCrypto].usd);
                }
                catch (err) {
                }
            }))();
        }
    }, [customerPaysStage, selectedCrypto]);
    console.log(cryptoPrice);
    let input = {
        fullName: `${firstName} ${lastName}`,
        company: email,
        streetLine1: address,
        streetLine2: address2,
        city: city,
        province: province,
        postalCode: zip,
        countryCode: countryCode.value,
        phoneNumber: telegram,
        customFields: {
            cryptoPrice: +(cryptoPrice),
            paymentType: selectedCrypto,
            paymentStartDate: new Date()
        }
    };
    const [getShippingMethods, { data: shippingOrderData, }] = (0, client_1.useLazyQuery)(queries_1.GET_ELIGIBLE_SHIPPING_METHODS, { fetchPolicy: 'network-only' }); // without this the cached shipping data is used, which might not be
    // eligible for  the current order
    const { data: countriesData } = (0, client_1.useQuery)(queries_1.GET_AVAILABLE_COUNTRIES);
    const { loading: activeOrderLoading, data: activeOrderData } = (0, client_1.useQuery)(queries_1.GET_ACTIVE_ORDER);
    const [setShippingAddress, { data: setShippingData }] = (0, client_1.useMutation)(queries_1.SET_SHIPPING_ADDRESS, {
        variables: { input: input }
    });
    const [setShippingMethod] = (0, client_1.useMutation)(queries_1.SET_SHIPPING_METHOD, {
        variables: { id: shippingType.value },
    });
    const [transitionToPayment] = (0, client_1.useMutation)(queries_1.TRANSITION_TO_ARRANGING_PAYMENT, {
        variables: {
            metadata: {
                dupa2: "chuj"
            }
        }
    });
    const [transitionOrderState] = (0, client_1.useMutation)(queries_1.TRANSITION_ORDER_STATE);
    const [addPayment, { data: addPaymentData }] = (0, client_1.useMutation)(queries_1.ADD_PAYMENT, {
        variables: {
            input: {
                method: 'standard-payment',
                metadata: {
                    transactionID: transactionID,
                }
            }
        },
        refetchQueries: [{ query: queries_1.GET_ACTIVE_ORDER }]
    });
    (0, react_1.useEffect)(() => {
        if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") {
            // @ts-expect-error TS(2345): Argument of type 'Date' is not assignable to param... Remove this comment to see the full error message
            const currentTimeInSeconds = Date.parse(new Date()) / 1000;
            const orderTimeInSeconds = Date.parse(activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate) / 1000;
            const timeoutTimeForOrder = (orderTimeInSeconds + 1800);
            let whenTimeout = timeoutTimeForOrder - currentTimeInSeconds;
            console.log("Pozostalo do timeoutu:");
            console.log(whenTimeout);
            const interval = setInterval(() => {
                whenTimeout--;
                setSecondsSinceOrderPlaced(whenTimeout);
                console.log(whenTimeout);
                if (whenTimeout <= 0) {
                    transitionOrderState({ variables: { input: 'Cancelled' }, refetchQueries: [{ query: queries_1.GET_ACTIVE_ORDER }] });
                    setFinalStage(false);
                    setCustomerDetailsStage(false);
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [activeOrderData, transitionOrderState]);
    const cancelButton = () => {
        return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button small', onClick: () => {
                transitionOrderState({ variables: { input: 'Cancelled' }, refetchQueries: [{ query: queries_1.GET_ACTIVE_ORDER }] });
                setFinalStage(false);
                setCustomerDetailsStage(false);
            } }, { children: "Cancel order" })));
    };
    function editButton(setStage) {
        return ((0, jsx_runtime_1.jsx)("button", Object.assign({ className: 'my-button small', onClick: () => {
                transitionOrderState({ variables: { input: 'AddingItems' } });
                setCustomerDetailsStage(true);
                setStage(false);
            } }, { children: "Edit order" })));
    }
    (0, react_1.useEffect)(() => {
        if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") {
            setSelectedCrypto(activeOrderData.activeOrder.shippingAddress.customFields.paymentType);
            setCustomerDetailsStage(false);
            setCustomerPaysStage(true);
        }
    }, [activeOrderData]);
    (0, react_1.useEffect)(() => {
        if (setShippingData && setShippingData.setOrderShippingAddress.shippingAddress.country) {
            getShippingMethods();
        }
    }, [setShippingData, getShippingMethods]);
    (0, react_1.useEffect)(() => {
        if (cryptoPrice && activeOrderData.activeOrder && (activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice === 0)) {
            setShippingAddress();
        }
    }, [cryptoPrice, setShippingAddress, activeOrderData]);
    const [setCustomerForOrder] = (0, client_1.useMutation)(queries_1.SET_CUSTOMER_FOR_ORDER, {
        variables: {
            input: {
                emailAddress: email,
                firstName: firstName,
                lastName: lastName,
            }
        }
    });
    console.log(activeOrderData);
    let shippingMethodsFormated = [];
    if (shippingOrderData)
        shippingOrderData.eligibleShippingMethods.forEach((method) => {
            shippingMethodsFormated.push({
                value: method.id,
                label: `${method.name} - ${method.price / 100}$`
            });
        });
    let countriesDataFormated = [];
    countriesData && countriesData.availableCountries.forEach((data, i) => {
        countriesDataFormated.push({
            value: data.code,
            label: data.name
        });
    });
    (0, react_1.useEffect)(() => {
        if (window.innerWidth < 700)
            window.scrollTo(0, 130);
    }, []);
    (0, react_1.useEffect)(() => {
        if (activeOrderData && activeOrderData.activeOrder) {
            setTelegram(activeOrderData.activeOrder.shippingAddress.phoneNumber);
            setAddress(activeOrderData.activeOrder.shippingAddress.streetLine1);
            setAddress2(activeOrderData.activeOrder.shippingAddress.streetLine2);
            setCity(activeOrderData.activeOrder.shippingAddress.city);
            setProvince(activeOrderData.activeOrder.shippingAddress.province);
            setZip(activeOrderData.activeOrder.shippingAddress.postalCode);
            setCountryCode({
                // @ts-expect-error TS(2345): Argument of type '{ value: any; label: any; }' is ... Remove this comment to see the full error message
                value: activeOrderData.activeOrder.shippingAddress.countryCode,
                label: activeOrderData.activeOrder.shippingAddress.countryCode
            });
        }
    }, [activeOrderLoading, activeOrderData]);
    return ((0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: 'row flex-wrap-reverse' }, { children: [(activeOrderData && activeOrderData.activeOrder && (activeOrderData.activeOrder.totalQuantity !== 0)) || finalStage ?
                    (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'col-md-6 col-lg-7' }, { children: (0, jsx_runtime_1.jsxs)("div", { children: [activeOrderData && activeOrderData.activeOrder && console.log(activeOrderData.activeOrder.state), (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") ?
                                    customerPaysStage && (0, customerPays_1.default)(activeOrderData, secondsSinceOrderPlaced, selectedCrypto, storeCryptoAddresses, setTransactionID, addPayment, setCustomerPaysStage, setFinalStage, setCustomerDetailsStage, editButton, cancelButton)
                                    : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [customerDetailsStage && (0, customerDetails_1.default)(setCustomerDetailsStage, setShippingDetailsStage, setCustomerForOrder, firstName, setFirstName, lastName, setLastName, email, setEmail, telegram, setTelegram, cancelButton), shippingDetailsStage && (0, shippingDetails_1.default)(setShippingAddress, setShippingMethodStage, setShippingDetailsStage, setAddress, address, address2, setAddress2, city, setCity, province, setProvince, zip, setZip, countryCode, setCountryCode, countriesDataFormated, cancelButton), shippingMethodStage && (0, shippingMethod_1.default)(shippingType, setShippingType, setShippingMethodStage, setPaymentMethodStage, setShippingMethod, shippingMethodsFormated, customStyles, cancelButton), paymentMethodStage && (0, paymentMethod_1.default)(setPaymentMethodStage, setPaymentStage, setSelectedCrypto, selectedCrypto, setShippingAddress, shippingType, cancelButton), paymentStage && (0, reviewDetails_1.default)(activeOrderData, transitionToPayment, setShippingAddress, setPaymentStage, setCustomerPaysStage, cancelButton, editButton), (finalStage && addPaymentData && addPaymentData.addPaymentToOrder && addPaymentData.addPaymentToOrder.errorCode) ?
                                                (0, finalizationStage_1.default)(false, addPaymentData)
                                                : (0, finalizationStage_1.default)(true, addPaymentData)] })] }) }))
                    : (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'col-md-6 col-lg-6 text-center align-self-baseline' }, { children: (0, jsx_runtime_1.jsx)("h2", { children: "NO ORDER" }) })), !finalStage && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: 'col-md-6 col-lg-5 ' }, { children: (0, jsx_runtime_1.jsx)(cartDetailsTable_1.default, { showButtons: (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state) === ('AddingItems'), animate: false, responsive: true }) }))] })) }));
}
exports.default = Checkout;
