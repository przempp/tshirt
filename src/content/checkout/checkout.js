import React, { useEffect, useState } from 'react';
import {useMutation, useQuery} from "@apollo/client";
import {
    SET_SHIPPING_ADDRESS,
    SET_CUSTOMER_FOR_ORDER,
    GET_ELIGIBLE_SHIPPING_METHODS,
    SET_SHIPPING_METHOD
} from "../data/queries";

function Checkout() {
    const [shippingType, setShippingType] = useState(1);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [telegram, setTelegram] = useState("");
    const [phone, setPhone] = useState("");
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
            countryCode: 'DE',
            phoneNumber: telegram,
        }
    const { loading: shippingLoading, error: shippingOrderError, data: shippingOrderData } = useQuery(GET_ELIGIBLE_SHIPPING_METHODS);


    const [setShippingMethod, { loading: setShippingMethodLoading, error: setShippingMethodError, data: setShippingMethodData }] = useMutation(SET_SHIPPING_METHOD,
        {
            variables: {id: shippingType }
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

    console.log(shippingOrderData)
    console.log(shippingType)




    return(
        <div>

            <form>
                <div className="form-row">

                    <div className="form-group col-md-6">
                        <label htmlFor="inputFirstName4">First Name</label>
                        <input onChange={event => setFirstName(event.target.value)} value={firstName} name='firstName' type="text" id="inputFirstName4" className="form-control" placeholder="First name"/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputLastName4">Last Name</label>
                        <input onChange={event => setLastName(event.target.value)} value={lastName} name='lastName' type="text" className="form-control" placeholder="Last name"/>
                    </div>

                </div>

                <div className="form-row">
                    <div className="form-group col-md-6">
                        <label htmlFor="inputEmail4">Email</label>
                        <input onChange={event => setEmail(event.target.value)} value={email} type="email" className="form-control" id="inputEmail4" placeholder="Email"/>
                    </div>

                    <div className="form-group col-md-6">
                        <label htmlFor="inputTelegram4">Telegram</label>
                        <input onChange={event => setTelegram(event.target.value)} value={telegram} type="telegram" className="form-control" id="inputTelegram4" placeholder="Telegram"/>
                    </div>

                </div>
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
                    <div className="form-group col-md-6">
                        <label htmlFor="inputCity">City</label>
                        <input onChange={event => setCity(event.target.value)} value={city}
                            type="text" className="form-control" id="inputCity"/>
                    </div>
                    <div className="form-group col-md-4">
                        <label htmlFor="inputState">State</label>
                        <input onChange={event => setProvince(event.target.value)} value={province}
                            id="inputState" type="text" className="form-control"/>

                    </div>
                    <div className="form-group col-md-2">
                        <label htmlFor="inputZip">Zip</label>
                        <input onChange={event => setZip(event.target.value)} value={zip}
                            type="text" className="form-control" id="inputZip"/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck"/>
                            <label className="form-check-label" htmlFor="gridCheck">
                                Check me out
                            </label>
                    </div>
                </div>


            </form>
            <button onClick={setCustomerForOrder}  className="btn btn-primary" >Send customer details</button>
            <button onClick={setShippingAddress}  className="btn btn-primary" >Send</button>
            <div>
                <input onChange={e => setShippingType(e.target.value)} type="radio" value="1" name="gender"  /> Male
            </div>
            <button onClick={setShippingMethod}  className="btn btn-primary" >Set Shipping</button>
        </div>
    )
}

export default Checkout