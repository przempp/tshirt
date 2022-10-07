import React, { useEffect, useState } from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {
    SET_SHIPPING_ADDRESS,
    SET_CUSTOMER_FOR_ORDER,
    GET_ELIGIBLE_SHIPPING_METHODS,
    SET_SHIPPING_METHOD, GET_ACTIVE_ORDER,
    GET_AVAILABLE_COUNTRIES,

} from "../data/queries";
import Select from 'react-select'
import Cart from '../cart/cart'
import CartDetailsTable from '../cart/cartDetailsTable'

function Checkout() {
    const [customerDetailsStage, setCustomerDetailsStage] = useState(true)
    const [shippingDetailsStage, setShippingDetailsStage] = useState(false)
    const [shippingMethodStage, setShippingMethodStage] = useState(false)
    const [finalizeStage, setFinalizeStage] = useState(false)


    const [shippingType, setShippingType] = useState(1);

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
        }

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

    const { loading: shippingLoading, error: shippingOrderError, data: shippingOrderData } = useQuery(GET_ELIGIBLE_SHIPPING_METHODS);
    const { loading: countriesLoading, error: countriesError, data: countriesData } = useQuery(GET_AVAILABLE_COUNTRIES);
    const { loading: activeOrderLoading, error: activeOrderError, data: activeOrderData } = useQuery(GET_ACTIVE_ORDER);
    const [setShippingMethod, { loading: setShippingMethodLoading, error: setShippingMethodError, data: setShippingMethodData }] = useMutation(SET_SHIPPING_METHOD,
        {
            variables: {id: shippingType.value }
        }
    )
    const [setShippingAddress, { loading: setShippingLoading, error: setShippingError, data: setShippingData }] = useMutation(SET_SHIPPING_ADDRESS,
        {
            variables: { input: input}
        }
    )
    const [setCustomerForOrder, { loading: setCustomerLoading, error: setCustomerError, data: setCustomerData }] = useMutation(SET_CUSTOMER_FOR_ORDER,
        {
            variables: { input: {
                    emailAddress: email,
                    firstName: firstName,
                    lastName: lastName,
                }}
        }
    )

    console.log(shippingType)

    let countriesDataFormated = []
    countriesData && countriesData.availableCountries.map((data, i) => {
        // console.log(data.name)
        // console.log(data.code)
        countriesDataFormated.push({
            value: data.code,
            label: data.name
        })
    } )
    // console.log(countryCode)

    let shippingMethodsFormated = []
    if (shippingOrderData) shippingOrderData.eligibleShippingMethods.map(method => {
        console.log(method.id)
        console.log(method.name)
        console.log(method.price)
        shippingMethodsFormated.push({
            value: method.id,
            label: `${method.name} - ${method.price/100}$`
        })
    })
    useEffect(() => {
        if (activeOrderData) {
            // console.log(activeOrderData.activeOrder)
            setTelegram(activeOrderData.activeOrder.shippingAddress.phoneNumber)
            setAddress(activeOrderData.activeOrder.shippingAddress.streetLine1)
            setAddress2(activeOrderData.activeOrder.shippingAddress.streetLine2)
            setCity(activeOrderData.activeOrder.shippingAddress.city)
            setProvince(activeOrderData.activeOrder.shippingAddress.province)

            setZip(activeOrderData.activeOrder.shippingAddress.postalCode)
            setCountryCode({value: activeOrderData.activeOrder.shippingAddress.countryCode, label: activeOrderData.activeOrder.shippingAddress.countryCode})

        }
        }, [activeOrderData])


    return(
        <div>
        <div className='row flex-wrap-reverse'>
            <div className={'col-md-6 col-lg-8'}>
                <form>
                {customerDetailsStage &&
                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputFirstName4">First Name</label>
                        <input onChange={event => setFirstName(event.target.value)} value={firstName} name='firstName' type="text" id="inputFirstName4" className="form-control" placeholder="First name"/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputLastName4">Last Name</label>
                        <input onChange={event => setLastName(event.target.value)} value={lastName} name='lastName' type="text" className="form-control" placeholder="Last name"/>

                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input onChange={event => setEmail(event.target.value)} value={email} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>
                    <div className="form-group col-md-6">
                        <label htmlFor="inputTelegram4">Telegram</label>
                        <input onChange={event => setTelegram(event.target.value)} value={telegram} type="telegram" className="form-control" id="inputTelegram4" placeholder="Telegram"/>
                    </div>
                    <div className="form-group col-md-12">
                    <button onClick={() => {
                        setCustomerDetailsStage(false)
                        setShippingDetailsStage(true)
                        setCustomerForOrder()
                    }}  className="btn btn-primary" >Next</button>
                    </div>
                </div>

                    }

                {shippingDetailsStage &&
                    <div>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input onChange={event => setAddress(event.target.value)} value={address} type="text" className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Address 2</label>
                    <input onChange={event => setAddress2(event.target.value)} value={address2}
                           type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor"/>
                </div>
                <div className="form-row">
                    <div className="form-group col-6 ">
                        <label htmlFor="inputCity">City</label>
                        <input onChange={event => setCity(event.target.value)} value={city}
                            type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="form-group col-6 ">
                        <label htmlFor="inputState">State</label>
                        <input onChange={event => setProvince(event.target.value)} value={province}
                            id="inputState" type="text" className="form-control"/>

                    </div>

                </div>
                <div className="form-row">
                    <div className="form-group col-5">
                        <label htmlFor="inputZip">Zip</label>
                        <input onChange={event => setZip(event.target.value)} value={zip}
                               type="text" className="form-control" id="inputZip"/>
                    </div>
                    <div className=" col-7">
                        <label htmlFor="inputCountry">Country</label>
                        <Select value={countryCode}  onChange={setCountryCode} styles={{
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
                        <button onClick={e => {
                            setShippingAddress()
                            setShippingMethodStage(true)
                            setShippingDetailsStage(false)
                        }}  className="btn btn-primary" >Continue</button>
                    </div>
                }
                    {shippingMethodStage &&
                        <div className="form">
                        <div className='form-group'>
                            <div className='col-12 pl-0'>
                                <label htmlFor="inputShippingType">Select Shipping Method</label>
                                <Select value={shippingType} onChange={e => {
                                    console.log(e)
                                    setShippingType(e)
                                }} styles={customStyles} options={shippingMethodsFormated} />
                            </div>



                        </div>
                            <div className='form-group'>


                            <button onClick={e => {
                                setShippingMethod()
                                setShippingMethodStage(false)
                                finalizeStage(true)
                            }}  className="btn btn-primary" type='button'>Set Shipping
                            </button>
                            </div>
                        </div>
                    }

                </form>


            </div>
            <div className='col-md-6 col-lg-4 '>
                <CartDetailsTable showButtons={true} animate={false} responsive={true}/>
            </div>

        </div>



    </div>
    )
}

export default Checkout