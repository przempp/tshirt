import React, {useEffect, useState} from 'react';
import {useLazyQuery, useMutation, useQuery,} from "@apollo/client";
import {
    ADD_PAYMENT,
    GET_ACTIVE_ORDER,
    GET_AVAILABLE_COUNTRIES,
    GET_ELIGIBLE_SHIPPING_METHODS,
    SET_CUSTOMER_FOR_ORDER,
    SET_SHIPPING_ADDRESS,
    SET_SHIPPING_METHOD,
    TRANSITION_ORDER_STATE,
    TRANSITION_TO_ARRANGING_PAYMENT
} from "../../data/queries";
// @ts-expect-error TS(6142): Module '../../components/cart/components/cartDetai... Remove this comment to see the full error message
import CartDetailsTable from '../../components/cart/components/cartDetailsTable'
// @ts-expect-error TS(6142): Module './components/customerDetails' was resolved... Remove this comment to see the full error message
import CustomerDetails from './components/customerDetails'
// @ts-expect-error TS(6142): Module './components/shippingDetails' was resolved... Remove this comment to see the full error message
import ShippingDetails from './components/shippingDetails'
// @ts-expect-error TS(6142): Module './components/shippingMethod' was resolved ... Remove this comment to see the full error message
import ShippingMethod from './components/shippingMethod'
// @ts-expect-error TS(6142): Module './components/paymentMethod' was resolved t... Remove this comment to see the full error message
import PaymentMethod from './components/paymentMethod'
// @ts-expect-error TS(6142): Module './components/reviewDetails' was resolved t... Remove this comment to see the full error message
import ReviewDetails from './components/reviewDetails'
// @ts-expect-error TS(6142): Module './components/finalizationStage' was resolv... Remove this comment to see the full error message
import FinalizationStage from './components/finalizationStage'
// @ts-expect-error TS(6142): Module './components/customerPays' was resolved to... Remove this comment to see the full error message
import CustomerPays from './components/customerPays'

import CoinGeckoApi from '@crypto-coffee/coingecko-api'


function Checkout() {
    const [customerDetailsStage, setCustomerDetailsStage] = useState(true)
    const [shippingDetailsStage, setShippingDetailsStage] = useState(false)
    const [shippingMethodStage, setShippingMethodStage] = useState(false)
    const [paymentMethodStage, setPaymentMethodStage] = useState(false)
    const [paymentStage, setPaymentStage] = useState(false)
    const [customerPaysStage, setCustomerPaysStage] = useState(false)
    const [finalStage, setFinalStage] = useState(false)

    const [cryptoPrice, setCryptoPrice] = useState(0)
    const [secondsSinceOrderPlaced, setSecondsSinceOrderPlaced] = useState(0)
    const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
    const [shippingType, setShippingType] = useState(0);
    const [transactionID, setTransactionID] = useState('');

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");

    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");
    const [countryCode, setCountryCode] = useState("");


    const customStyles = {
        // @ts-expect-error TS(7006): Parameter 'provided' implicitly has an 'any' type.
        option: (provided, state) => ({
            ...provided,
            color: 'black'
        }),
        // @ts-expect-error TS(7006): Parameter 'provided' implicitly has an 'any' type.
        input: (provided, state) => ({
            ...provided,
            color: 'black'
        }),
        // @ts-expect-error TS(7006): Parameter 'provided' implicitly has an 'any' type.
        placeholder: (provided, state) => ({
            ...provided,
            color: 'black'
        }),

    }


    const storeCryptoAddresses =
        {
            bitcoin: 'btc_address',
            ethereum: 'eth_address',
            monero: 'xrm_address',
            litecoin: 'ltc_address'
        }


    useEffect(() => {
        if (customerPaysStage) {
            ;(async () => {
                try {
                    const coinGeckoApi = new CoinGeckoApi()
                    const results = await coinGeckoApi.simple({
                        ids: [selectedCrypto],
                        vs_currencies: 'usd'
                    })
                    setCryptoPrice(results[selectedCrypto].usd)
                } catch (err) {
                }
            })()
        }
    }, [customerPaysStage, selectedCrypto]);

    console.log(cryptoPrice)

    let input = {
    fullName: `${firstName} ${lastName}`,
    company: email,
    streetLine1: address,
    streetLine2: address2,
    city: city,
    province: province,
    postalCode: zip,
    countryCode: (countryCode as any).value,
    phoneNumber: telegram,
    customFields: {
        cryptoPrice: +(cryptoPrice),
        paymentType: selectedCrypto,
        paymentStartDate: new Date()
    }
};

    const [getShippingMethods, {
        data: shippingOrderData,
    }] = useLazyQuery(GET_ELIGIBLE_SHIPPING_METHODS,
        {fetchPolicy: 'network-only'}); // without this the cached shipping data is used, which might not be
    // eligible for  the current order
    const {data: countriesData} = useQuery(GET_AVAILABLE_COUNTRIES);
    const {loading: activeOrderLoading, data: activeOrderData} = useQuery(GET_ACTIVE_ORDER);
    const [setShippingAddress, {
        data: setShippingData
    }] = useMutation(SET_SHIPPING_ADDRESS,
        {
            variables: {input: input}
        }
    )

    const [setShippingMethod] = useMutation(SET_SHIPPING_METHOD, {
    variables: { id: (shippingType as any).value },
});

    const [transitionToPayment] = useMutation(TRANSITION_TO_ARRANGING_PAYMENT,
        {
            variables: {
                metadata: {
                    dupa2: "chuj"
                }
            }
        }
    )

    const [transitionOrderState] = useMutation(TRANSITION_ORDER_STATE)

    const [addPayment, {
        data: addPaymentData
    }] = useMutation(ADD_PAYMENT,
        {
            variables: {
                input: {
                    method: 'standard-payment',
                    metadata: {
                        transactionID: transactionID,
                    }
                }
            },
            refetchQueries: [{query: GET_ACTIVE_ORDER}]
        }
    )
    useEffect(() => {
        if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") {
            // @ts-expect-error TS(2345): Argument of type 'Date' is not assignable to param... Remove this comment to see the full error message
            const currentTimeInSeconds = Date.parse(new Date()) / 1000
            const orderTimeInSeconds = Date.parse(activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate) / 1000
            const timeoutTimeForOrder = (orderTimeInSeconds + 1800)
            let whenTimeout = timeoutTimeForOrder - currentTimeInSeconds
            console.log("Pozostalo do timeoutu:")
            console.log(whenTimeout)
            const interval = setInterval(() => {
                whenTimeout--
                setSecondsSinceOrderPlaced(whenTimeout)
                console.log(whenTimeout)
                if (whenTimeout <= 0) {
                    transitionOrderState({variables: {input: 'Cancelled'}, refetchQueries: [{query: GET_ACTIVE_ORDER}]})
                    setFinalStage(false)
                    setCustomerDetailsStage(false)
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [activeOrderData, transitionOrderState])

    const cancelButton = () => {
        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className='my-button small'  onClick={() => {
                transitionOrderState({variables: {input: 'Cancelled'}, refetchQueries: [{query: GET_ACTIVE_ORDER}]})
                setFinalStage(false)
                setCustomerDetailsStage(false)
            }}>
                Cancel order
            </button>
        )
    }

    function editButton(setStage: any) {
        return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <button className='my-button small'  onClick={() => {
                transitionOrderState({variables: {input: 'AddingItems'}})
                setCustomerDetailsStage(true)
                setStage(false)

            }}>
                Edit order
            </button>
        )
    }


    useEffect(() => {
        if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") {
            setSelectedCrypto(activeOrderData.activeOrder.shippingAddress.customFields.paymentType)
            setCustomerDetailsStage(false)
            setCustomerPaysStage(true)
        }
    }, [activeOrderData]);


    useEffect(() => {
        if (setShippingData && setShippingData.setOrderShippingAddress.shippingAddress.country) {
            getShippingMethods()
        }
    }, [setShippingData, getShippingMethods])


    useEffect(() => {
        if (cryptoPrice && activeOrderData.activeOrder && (activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice === 0)) {
            setShippingAddress()
        }
    }, [cryptoPrice, setShippingAddress, activeOrderData])


    const [setCustomerForOrder] = useMutation(SET_CUSTOMER_FOR_ORDER,
        {
            variables: {
                input: {
                    emailAddress: email,
                    firstName: firstName,
                    lastName: lastName,
                }
            }
        })
    console.log(activeOrderData)
    let shippingMethodsFormated: any = []
    if (shippingOrderData) shippingOrderData.eligibleShippingMethods.forEach((method: any) => {
        shippingMethodsFormated.push({
            value: method.id,
            label: `${method.name} - ${method.price / 100}$`
        })
    })
    let countriesDataFormated: any = []
    countriesData && countriesData.availableCountries.forEach((data: any, i: any) => {

        countriesDataFormated.push({
            value: data.code,
            label: data.name
        })
    })

    useEffect(() => {
        if (window.innerWidth < 700) window.scrollTo(0, 130)
    }, [])

    useEffect(() => {
        if (activeOrderData && activeOrderData.activeOrder) {
            setTelegram(activeOrderData.activeOrder.shippingAddress.phoneNumber)
            setAddress(activeOrderData.activeOrder.shippingAddress.streetLine1)
            setAddress2(activeOrderData.activeOrder.shippingAddress.streetLine2)
            setCity(activeOrderData.activeOrder.shippingAddress.city)
            setProvince(activeOrderData.activeOrder.shippingAddress.province)
            setZip(activeOrderData.activeOrder.shippingAddress.postalCode)
            setCountryCode({
                // @ts-expect-error TS(2345): Argument of type '{ value: any; label: any; }' is ... Remove this comment to see the full error message
                value: activeOrderData.activeOrder.shippingAddress.countryCode,
                label: activeOrderData.activeOrder.shippingAddress.countryCode
            })
        }
    }, [activeOrderLoading, activeOrderData])




    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='row flex-wrap-reverse'>

                {(activeOrderData && activeOrderData.activeOrder && (activeOrderData.activeOrder.totalQuantity !== 0)) || finalStage ?
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <div className={'col-md-6 col-lg-7'}>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <div>

                            {activeOrderData && activeOrderData.activeOrder && console.log(activeOrderData.activeOrder.state)}

                            {(activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") ?

                                customerPaysStage && CustomerPays(
                                    activeOrderData,
                                    secondsSinceOrderPlaced,
                                    selectedCrypto,
                                    storeCryptoAddresses,
                                    setTransactionID,
                                    addPayment,
                                    setCustomerPaysStage,
                                    setFinalStage, setCustomerDetailsStage,
                                    editButton, cancelButton)
                                // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                                : <>

                                    {customerDetailsStage && CustomerDetails(
                                        setCustomerDetailsStage, setShippingDetailsStage, setCustomerForOrder,
                                        firstName, setFirstName,
                                        lastName, setLastName,
                                        email, setEmail,
                                        telegram, setTelegram,
                                        cancelButton
                                    )}

                                    {shippingDetailsStage && ShippingDetails(
                                        setShippingAddress, setShippingMethodStage, setShippingDetailsStage,
                                        setAddress, address,
                                        address2, setAddress2,
                                        city, setCity,
                                        province, setProvince,
                                        zip, setZip,
                                        countryCode, setCountryCode,
                                        countriesDataFormated,
                                        cancelButton
                                    )}

                                    {shippingMethodStage && ShippingMethod(
                                        shippingType, setShippingType,
                                        setShippingMethodStage, setPaymentMethodStage,
                                        setShippingMethod, shippingMethodsFormated,
                                        customStyles,
                                        cancelButton
                                    )}

                                    {paymentMethodStage && PaymentMethod(
                                        setPaymentMethodStage, setPaymentStage,
                                        setSelectedCrypto, selectedCrypto,
                                        setShippingAddress, shippingType,
                                        cancelButton
                                    )}

                                    {paymentStage && ReviewDetails(
                                        activeOrderData, transitionToPayment,
                                        setShippingAddress, setPaymentStage, setCustomerPaysStage,
                                        cancelButton, editButton
                                    )}

                                    {(finalStage && addPaymentData && addPaymentData.addPaymentToOrder && addPaymentData.addPaymentToOrder.errorCode) ?
                                        FinalizationStage(false, addPaymentData)
                                        : FinalizationStage(true, addPaymentData)}

                                </>}

                        </div>


                    </div>
                    : // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <div className='col-md-6 col-lg-6 text-center align-self-baseline'>
                        {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <h2>NO ORDER</h2>
                    </div>}

                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {!finalStage && <div className='col-md-6 col-lg-5 '>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <CartDetailsTable
                        showButtons={(activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state) === ('AddingItems')}
                        animate={false} responsive={true}/>
                </div>}

            </div>


        </div>
    )
}

export default Checkout