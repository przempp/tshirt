import React, { useEffect, useState } from 'react';
import {useMutation, useQuery, useLazyQuery, } from "@apollo/client";
import {
    SET_SHIPPING_ADDRESS,
    SET_CUSTOMER_FOR_ORDER,
    GET_ELIGIBLE_SHIPPING_METHODS,
    SET_SHIPPING_METHOD, GET_ACTIVE_ORDER,
    GET_AVAILABLE_COUNTRIES,
    TRANSITION_TO_ARRANGING_PAYMENT,
    ADD_PAYMENT,
} from "../data/queries";
import Select from 'react-select'
import Cart from '../cart/cart'
import CartDetailsTable from '../cart/cartDetailsTable'
import { Form }from 'react-bootstrap'

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
    const [orderDate, setOrderDate] = useState()
    const [selectedCrypto, setSelectedCrypto] = useState("bitcoin")
    const [shippingType, setShippingType] = useState(0);
    const [transactionID, setTransationID] = useState('');


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");
    // const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [address2, setAddress2] = useState("");
    const [city, setCity] = useState("");
    const [province, setProvince] = useState("");
    const [zip, setZip] = useState("");



        const customStyles={
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
        {bitcoin: 'btc_address',
        ethereum: 'eth_address',
        monero: 'xrm_address'}


    useEffect(() => {
        if (customerPaysStage) {
        ;(async () => {
            try {
                const coinGeckoApi = new CoinGeckoApi()
                const results = await coinGeckoApi.simple({
                    ids: [selectedCrypto],
                    vs_currencies: 'usd'
                })
                console.log(results[selectedCrypto].usd)
                console.log(selectedCrypto)
                setCryptoPrice(results[selectedCrypto].usd)
                console.log('zmiana ceny kurwy!!!!!!!!!!!!!!!! !!!!!!!! !!!!!!!!!!!!!!! !!!!!!!!!!!!!!! !!!!!!!! !!!!!!!!!!!!!!! !!!!!!!! !!!!!!!!!')
            } catch (err) {
                console.log(err)
            }
        })()
        }
    },[customerPaysStage]);
    console.log(cryptoPrice)




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
        }
        // console.log('shippingType:')
        // console.log(shippingType.value)


    const [getShippingMethods, { loading: shippingLoading, error: shippingOrderError, data: shippingOrderData, refetch  }] = useLazyQuery(GET_ELIGIBLE_SHIPPING_METHODS,
        {fetchPolicy: 'network-only'});
    const { loading: countriesLoading, error: countriesError, data: countriesData } = useQuery(GET_AVAILABLE_COUNTRIES);
    const { loading: activeOrderLoading, error: activeOrderError, data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    const [setShippingAddress, { loading: setShippingLoading, error: setShippingError, data: setShippingData }] = useMutation(SET_SHIPPING_ADDRESS,
        {
            variables: { input: input }
        }
    )

    const [setShippingMethod, { loading: setShippingMethodLoading, error: setShippingMethodError, data: setShippingMethodData }] = useMutation(SET_SHIPPING_METHOD,
        {
            variables: {id: shippingType.value },
        }
    )

    const [transitionToPayment, {  error: transitionToPaymentError }] = useMutation(TRANSITION_TO_ARRANGING_PAYMENT,
            {
                variables: {
                    metadata: {
                        dupa2: "chuj"
                    }
                }
            }
    )

        const [addPayment, { loading: addPaymentLoading, error: addPaymentError, data: addPaymentData }] = useMutation(ADD_PAYMENT,
        {
            variables: {
                input: {
                method: 'standard-payment',
                metadata: {
                    transactionID: transactionID,
                }}},
         refetchQueries: [{ query: GET_ACTIVE_ORDER }]
        }
    )
    // console.log('shipping order data:')
    // console.log(setShippingData)


    useEffect(() => {
        if (activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") {
            console.log(activeOrderData.activeOrder.shippingAddress.customFields.paymentType)
            setSelectedCrypto(activeOrderData.activeOrder.shippingAddress.customFields.paymentType)
            setCustomerDetailsStage(false)
            setCustomerPaysStage(true)
        }
    },[activeOrderData]);


    useEffect(() => {
        if (setShippingData && setShippingData.setOrderShippingAddress.shippingAddress.country) {
            console.log('WALE KONIKA!!!!!!!!!!!!!!!!!!!')
            // console.log(setShippingData)
            getShippingMethods()
        }
    }, [setShippingData])


    useEffect( () => {
        if (cryptoPrice && activeOrderData.activeOrder && (activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice === 0) ) {
            console.log('ustawiamy ze hej ????????????????????????????????????')
            console.log(parseFloat(cryptoPrice))
            setOrderDate(new Date())
            setShippingAddress()
        }
    }, [cryptoPrice])

    const [setCustomerForOrder, { loading: setCustomerLoading, error: setCustomerError, data: setCustomerData }] = useMutation(SET_CUSTOMER_FOR_ORDER,
        {
            variables: { input: {
                    emailAddress: email,
                    firstName: firstName,
                    lastName: lastName,
                }}
        }
    )

    // console.log(shippingType)

    // console.log(activeOrderData)
    // console.log('---------------------')
    // console.log("jakie shippingi są? :")
    // console.log(shippingOrderData)

    // console.log(countryCode)

    let shippingMethodsFormated = []
    if (shippingOrderData) shippingOrderData.eligibleShippingMethods.map(method => {
        // console.log(method.id)
        // console.log(method.name)
        // console.log(method.price)
        shippingMethodsFormated.push({
            value: method.id,
            label: `${method.name} - ${method.price/100}$`
        })
    })
    const currentTime = new Date()
    // console.log('============')
    // if (activeOrderData && activeOrderData.activeOrder.shippingAddress.customFields) console.log( currentTime.getTime() - activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate )
    // if (activeOrderData && activeOrderData.activeOrder.shippingAddress.customFields) console.log(typeof(activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate))
    // if (activeOrderData && activeOrderData.activeOrder.shippingAddress.customFields) console.log(Date.parse(activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate))
    // if (activeOrderData && activeOrderData.activeOrder) console.log(Date.parse(new Date()))
    // if (activeOrderData && activeOrderData.activeOrder.shippingAddress.customFields) console.log( (Date.parse(new Date()) - Date.parse(activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate) ) / 1000 )
    let countriesDataFormated = []
    countriesData && countriesData.availableCountries.map((data, i) => {
        // console.log(data.name)
        // console.log(data.code)
        countriesDataFormated.push({
            value: data.code,
            label: data.name
        })
    } )
    // console.log(activeOrderData)
    useEffect(() => {
        if (activeOrderData && activeOrderData.activeOrder) {
            // console.log('chuj')
            // console.log(activeOrderData.activeOrder)
            setTelegram(activeOrderData.activeOrder.shippingAddress.phoneNumber)
            setAddress(activeOrderData.activeOrder.shippingAddress.streetLine1)
            setAddress2(activeOrderData.activeOrder.shippingAddress.streetLine2)
            setCity(activeOrderData.activeOrder.shippingAddress.city)
            setProvince(activeOrderData.activeOrder.shippingAddress.province)
            setZip(activeOrderData.activeOrder.shippingAddress.postalCode)
            setCountryCode({value: activeOrderData.activeOrder.shippingAddress.countryCode, label: activeOrderData.activeOrder.shippingAddress.countryCode})
            // console.log('zmiana danych z useEffect')
        }
        }, [activeOrderLoading])


    function checkIfEmptyInputs(inputsArray) {
        // console.log(inputsArray)
        let isEmpty = false
        inputsArray.map((input) => {
            // console.log(input)
            if (input === null || input.trim().length === 0 ) {
                isEmpty = true
            }})
        // console.log(isEmpty)
        return isEmpty
    }
    // if (activeOrderData && activeOrderData.activeOrder) console.log(activeOrderData.activeOrder.state)
    // if (addPaymentData) console.log(addPaymentData.addPaymentToOrder.code)
    return(
        <div>
        <div className='row flex-wrap-reverse'>

            {(activeOrderData && activeOrderData.activeOrder) || finalStage ? <div className={'col-md-6 col-lg-7'}>
                <div>

                    {activeOrderData && activeOrderData.activeOrder && console.log(activeOrderData.activeOrder.state)}

                    {(activeOrderData && activeOrderData.activeOrder && activeOrderData.activeOrder.state === "ArrangingPayment") ?

                        customerPaysStage && <div className='col-12 pl-0 align-self-baseline'>
                            <h2>Put in stuff and pay:</h2>
                            {console.log(activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice)}
                            <p>Current {selectedCrypto} price: {cryptoPrice}$</p>
                            <p>Current {selectedCrypto} price: {activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice}$</p>
                            <p>Amount to pay: {1/cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100)} ({Math.round(1/cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100) * cryptoPrice )}$)</p>
                            <p></p>
                            <p className='text-capitalize'>SEND {selectedCrypto} TO THIS ADDRESS: {storeCryptoAddresses[selectedCrypto]}</p>
                            {console.log(activeOrderData.activeOrder.totalWithTax)}
                            <label>Paste in the transaction ID</label>
                            <input onChange={e => setTransationID(e.target.value)} type="text" className="form-control" aria-label="Small"
                                   aria-describedby="inputGroup-sizing-sm"/>
                            <button  type='button' onClick={e => {
                                addPayment()
                                setCustomerPaysStage(false)
                                setFinalStage(true)
                                setCustomerDetailsStage(false)

                            }}>
                                FINALIZE AND PAY!
                            </button>
                        </div>


                        : <>






                {customerDetailsStage &&
                <form onSubmit={() => {
                    // console.log('jedziemy')
                    setCustomerDetailsStage(false)
                    setShippingDetailsStage(true)
                    setCustomerForOrder()

                }}>
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputFirstName4">First Name</label>
                        <input required onChange={event => setFirstName(event.target.value)} value={firstName} name='firstName' type="text" id="inputFirstName4" className="form-control" placeholder="First name"/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputLastName4">Last Name</label>
                        <input required onChange={event => setLastName(event.target.value)} value={lastName} name='lastName' type="text" className="form-control" placeholder="Last name"/>

                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input required onChange={event => setEmail(event.target.value)} value={email} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputTelegram4">Telegram</label>
                        <input required onChange={event => setTelegram(event.target.value)} value={telegram} type="telegram" className="form-control" id="inputTelegram4" placeholder="Telegram"/>
                    </div>
                    <div className="form-group col-md-12">
                    <button
                            className="btn btn-primary" type="submit" >Next</button>
                    </div>
                </div>
                </form>

                    }

                {shippingDetailsStage &&
                    <form  onSubmit={() => {
                        setShippingAddress()
                        setShippingMethodStage(true)
                        setShippingDetailsStage(false)
                        // getShippingMethods()
                    }}>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input required onChange={event => setAddress(event.target.value)} value={address} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Address 2</label>
                    <input onChange={event => setAddress2(event.target.value)} value={address2}
                           type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                </div>
                <div className="form-row">
                    <div className="form-group col-6 ">
                        <label htmlFor="inputCity">City</label>
                        <input required onChange={event => setCity(event.target.value)} value={city}
                            type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="form-group col-6 ">
                        <label htmlFor="inputState">State</label>
                        <input required onChange={event => setProvince(event.target.value)} value={province}
                            id="inputState" type="text" className="form-control"/>

                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-5">
                        <label htmlFor="inputZip">Zip</label>
                        <input required onChange={event => setZip(event.target.value)} value={zip}
                               type="text" className="form-control" id="inputZip"/>
                    </div>
                    <div className=" col-7">
                        <label htmlFor="inputCountry">Country</label>
                        <Select rules={{ required: true }} value={countryCode} onChange={setCountryCode} styles={{
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

                        }} options={countriesDataFormated} />
                    </div>
                </div>
                        <button
                        //     onClick={e => {
                        //     setShippingAddress()
                        //     setShippingMethodStage(true)
                        //     setShippingDetailsStage(false)
                        //     getShippingMethods()
                        // }}
                            type='submit' disabled={!countryCode.value} className="btn btn-primary" >
                            Continue</button>
                    </form>
                }
                    {shippingMethodStage &&
                        <div className="form">
                        <div className='form-group'>
                            <div className='col-12 pl-0'>
                                <label htmlFor="inputShippingType">Select Shipping Method</label>
                                <Select value={shippingType} onChange={e => {
                                    // console.log(e)
                                    setShippingType(e)
                                }} styles={customStyles} options={shippingMethodsFormated} />
                            </div>



                        </div>
                            <div className='form-group'>
                                {/*<button onClick={e => {*/}
                                {/*    getShippingMethods()*/}
                                {/*    refetch()*/}
                                {/*}}  className="btn btn-primary" type='button'>refresh options*/}
                                {/*</button>*/}

                            <button onClick={e => {
                                // getShippingMethods()
                                setShippingMethod()
                                setShippingMethodStage(false)
                                setPaymentMethodStage(true)
                            }}  className="btn btn-primary" disabled={(!shippingType)} type='button'>Set Shipping
                            </button>
                            </div>
                        </div>
                    }
                    {paymentMethodStage &&
                        <Form>
                            <h2>Pick payment option</h2>

                            {/*{console.log(selectedCrypto)}*/}
                                    <Form.Check
                                        type={'radio'}
                                        id={`radio-btc`}
                                        label={`Bitcoin`}
                                        onChange={() => setSelectedCrypto('bitcoin')}
                                        checked={selectedCrypto === "bitcoin"}
                                    />
                            <Form.Check
                                type={'radio'}
                                id={`default-eth`}
                                label={`Ethereum`}
                                onChange={() => setSelectedCrypto('ethereum')}
                                checked={selectedCrypto === "ethereum"}
                            />
                            <Form.Check
                                type={'radio'}
                                id={`default-xmr`}
                                label={`Monero`}
                                onChange={() => setSelectedCrypto('monero')}
                                checked={selectedCrypto === "monero"}
                            />

                            <button onClick={e => {
                                setShippingAddress()
                                setPaymentMethodStage(false)
                                setPaymentStage(true)
                            }}  className="btn btn-primary" disabled={(!shippingType)} type='button'>Finalize
                            </button>
                        </Form>
                    }


                {paymentStage &&

                            <div className=''>
                                <p>current: ArrangingPayment </p>
                                <div className={'row'}>
                                    <div className={'col-md-12 col-lg-6 d-flex flex-column pl-lg-4 pb-3'}>
                                        <h3>SHIPPING INFO</h3>
                                        <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.fullName}</p>
                                        <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.streetLine1}</p>
                                        <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.streetLine2}</p>
                                        <p className='pb-0 mb-0'>{`${activeOrderData.activeOrder.shippingAddress.city}, ${activeOrderData.activeOrder.shippingAddress.postalCode}`}</p>
                                        <p className='pb-0 mb-0'>{`${activeOrderData.activeOrder.shippingAddress.province} - ${activeOrderData.activeOrder.shippingAddress.country}`}</p>
                                    </div>
                                    <div className={'col-md-12 col-lg-6 text-lg-right text-md-left d-flex flex-column'}>
                                        <h3>CONTACT</h3>
                                        {/*{console.log(activeOrderData.activeOrder.shippingAddress.customFields.paymentType)}*/}
                                        <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.company}</p>
                                        <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.phoneNumber}</p>
                                        <p className='mt-2'>Payment with: {activeOrderData.activeOrder.shippingAddress.customFields.paymentType}</p>
                                    </div>
                                </div>
                                <div className='text-center'>
                                    <h2>Finalize payment:</h2>
                                    <button type='button' onClick={e => {
                                        transitionToPayment()
                                        setShippingAddress()
                                        // console.log('Zmiana na arranging payment POSZLA!')
                                        setPaymentStage(false)
                                        setCustomerPaysStage(true)

                                    }}>
                                        FINALIZE AND PAY!
                                    </button>
                                </div>
                            </div>}





                    {(finalStage && addPaymentData && addPaymentData.addPaymentToOrder && addPaymentData.addPaymentToOrder.errorCode) ? <div className='col-12 pl-0 text-center align-self-baseline'>
                        <h2>PAYMENT ERROR!</h2>
                        <p>{addPaymentData && addPaymentData.addPaymentToOrder.message}</p>
                        {/*{addPaymentData && console.log(addPaymentData)}*/}
                        {/*{addPaymentError && console.log(addPaymentError)}*/}
                    </div>
                        : (finalStage && addPaymentData) && <div className='col-12 pl-0 text-center align-self-baseline'>
                        <h2>PAYMENT SUCCESSFUL!</h2>
                        <p>Your order id is: {addPaymentData && addPaymentData.addPaymentToOrder.code}</p>
                        {addPaymentData.addPaymentToOrder.errorCode && <p>{addPaymentData.addPaymentToOrder.message}</p>}
                        {console.log(addPaymentData.addPaymentToOrder)}
                    </div>}

                        </>}

                </div>


            </div>
                : <div className='col-md-6 col-lg-6 text-center align-self-baseline'>
                <h2>NO ORDER</h2>
                </div>}

            {!finalStage &&<div className='col-md-6 col-lg-5 '>
                <CartDetailsTable showButtons={true} animate={false} responsive={true}/>
            </div>}

        </div>



    </div>
    )
}

export default Checkout