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
import CartDetailsTable from '../../components/cart/components/cartDetailsTable'
import CustomerDetails from './components/customerDetails'
import ShippingDetails from './components/shippingDetails'
import ShippingMethod from './components/shippingMethod'
import PaymentMethod from './components/paymentMethod'
import ReviewDetails from './components/reviewDetails'
import FinalizationStage from './components/finalizationStage'
import CustomerPays from './components/customerPays'
import useRenderBasedOnCase from './components/useRenderBasedOnCase'

import CoinGeckoApi from '@crypto-coffee/coingecko-api'


function Checkout() {
    const [currentOrderStage, setCurrentOrderStage] = useState("customerDetailsStage")

    const [cryptoPrice, setCryptoPrice] = useState(0)
    const [secondsSinceOrderPlaced, setSecondsSinceOrderPlaced] = useState(0)
    const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
    const [shippingType, setShippingType] = useState(0);
    const [transactionID, setTransactionID] = useState('');

    const [customerDetails, setCustomerDetails] = useState({
        firstName: "", lastName: "",
        email: "",     telegram: "",
        address: "", address2: "",
        city: "",    province: "",
        zip: "",     countryCode: "",
      });

    const customStyles = {
        option: (provided, state) => ({
            ...provided,
            color: 'black'
        }),
        input: (provided, state) => ({
            ...provided,
            color: 'black'
        }),
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
        if (currentOrderStage === 'customerPaysStage') {
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
    }, [currentOrderStage, selectedCrypto]);

   

    let input = {
        fullName: `${customerDetails.firstName} ${customerDetails.lastName}`,
        company: customerDetails.email,
        streetLine1: customerDetails.address,
        streetLine2: customerDetails.address2,
        city: customerDetails.city,
        province: customerDetails.province,
        postalCode: customerDetails.zip,
        countryCode: customerDetails.countryCode.value,
        phoneNumber: customerDetails.telegram,
        customFields: {
            cryptoPrice: +(cryptoPrice),
            paymentType: selectedCrypto,
            paymentStartDate: new Date()
        }
    }

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

    const [setShippingMethod] = useMutation(SET_SHIPPING_METHOD,
        {
            variables: {id: shippingType.value},
        }
    )

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
            const currentTimeInSeconds = Date.parse(new Date()) / 1000
            const orderTimeInSeconds = Date.parse(activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate) / 1000
            const timeoutTimeForOrder = (orderTimeInSeconds + 1800)
            let whenTimeout = timeoutTimeForOrder - currentTimeInSeconds
            const interval = setInterval(() => {
                whenTimeout--
                setSecondsSinceOrderPlaced(whenTimeout)
                if (whenTimeout <= 0) {
                    transitionOrderState({variables: {input: 'Cancelled'}, refetchQueries: [{query: GET_ACTIVE_ORDER}]})
                    setCurrentOrderStage('')
                }
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [activeOrderData, transitionOrderState])

    const cancelButton = () => {
        return (
            <button className='my-button small'  onClick={() => {
                transitionOrderState({variables: {input: 'Cancelled'}, refetchQueries: [{query: GET_ACTIVE_ORDER}]})
                setCurrentOrderStage('')
            }}>
                Cancel order
            </button>
        )
    }

    function editButton() {
        return (
            <button className='my-button small'  onClick={() => {
                transitionOrderState({variables: {input: 'AddingItems'}})
                setCurrentOrderStage('customerDetailsStage')
            }}>
                Edit order
            </button>
        )
    }

    useEffect(() => {
        if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") {
            setSelectedCrypto(activeOrderData.activeOrder.shippingAddress.customFields.paymentType)
            setCurrentOrderStage('customerPaysStage')
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
                    emailAddress: customerDetails.email,
                    firstName: customerDetails.firstName,
                    lastName: customerDetails.lastName,
                }
            }
        })
    
    let shippingMethodsFormated = []
    if (shippingOrderData) shippingOrderData.eligibleShippingMethods.forEach(method => {
        shippingMethodsFormated.push({
            value: method.id,
            label: `${method.name} - ${method.price / 100}$`
        })
    })
    let countriesDataFormated = []
    countriesData && countriesData.availableCountries.forEach((data, i) => {
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
            setCustomerDetails({
                ...customerDetails,
            telegram: activeOrderData.activeOrder.shippingAddress.phoneNumber,
            address: activeOrderData.activeOrder.shippingAddress.streetLine1,
            address2: activeOrderData.activeOrder.shippingAddress.streetLine2,
            city: activeOrderData.activeOrder.shippingAddress.city,
            province: activeOrderData.activeOrder.shippingAddress.province,
            zip: activeOrderData.activeOrder.shippingAddress.postalCode,
            countryCode: {
                value: activeOrderData.activeOrder.shippingAddress.countryCode,
                label: activeOrderData.activeOrder.shippingAddress.countryCode
            }
            })
        }
    }, [activeOrderLoading, activeOrderData])

      const { renderBasedOnCase } = useRenderBasedOnCase({
        customerDetails, setCustomerDetails,
        setCustomerForOrder,cancelButton,
        setCurrentOrderStage,
        setShippingAddress,countriesDataFormated,
        shippingType, setShippingType,
        setShippingMethod, shippingMethodsFormated,
        customStyles, setSelectedCrypto, selectedCrypto,
        activeOrderData, transitionToPayment,
        editButton, secondsSinceOrderPlaced,
        storeCryptoAddresses, setTransactionID, addPayment,
        CustomerDetails, ShippingDetails, ShippingMethod, PaymentMethod, ReviewDetails, CustomerPays
      });

    return (
        <div>
            <div className='row flex-wrap-reverse justify-content-center'>
                {(activeOrderData && activeOrderData.activeOrder && (activeOrderData.activeOrder.totalQuantity !== 0)) || currentOrderStage === 'finalStage' ?
                    <div className={'col-md-6 col-lg-7'}>
                        <div>
                    {`currently: ${currentOrderStage}`}
                        
                            {(activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") ? 
                            currentOrderStage === 'customerPaysStage' && CustomerPays(
                                    activeOrderData,
                                    secondsSinceOrderPlaced,
                                    selectedCrypto,
                                    storeCryptoAddresses,
                                    setTransactionID,
                                    addPayment,
                                    editButton, cancelButton,
                                    currentOrderStage, setCurrentOrderStage)
                                : <>
                                {renderBasedOnCase(currentOrderStage)}

                                    {(currentOrderStage === 'finalStage' && addPaymentData && addPaymentData.addPaymentToOrder && addPaymentData.addPaymentToOrder.errorCode) 
                                    ? FinalizationStage(false, addPaymentData)
                                    : FinalizationStage(true, addPaymentData)}
                                </>}
                        </div>
                    </div>
                    : <div className='col-md-6 col-lg-6 text-center align-self-baseline'>
                        <h2>NO ORDER</h2>
                    </div>}
                {currentOrderStage !== 'finalStage' && <div className='col-md-6 col-lg-5 '>
                    <CartDetailsTable
                        showButtons={(activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state) === ('AddingItems')}
                        animate={false} responsive={true}/>
                </div>}
            </div>
        </div>
    )
}

export default Checkout