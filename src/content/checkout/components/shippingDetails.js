import Select from "react-select";
import React from "react";

function ShippingDetails(
    setShippingAddress, setShippingMethodStage, setShippingDetailsStage,
    setAddress, address,
    address2, setAddress2,
    city, setCity,
    province, setProvince,
    zip, setZip,
    countryCode, setCountryCode,
    countriesDataFormated,
    cancelButton
) {
    return (
            <form onSubmit={(e) => {
                e.preventDefault();
                setShippingAddress()
                setShippingMethodStage(true)
                setShippingDetailsStage(false)
            }}>
                <div className="form-group">
                    <label htmlFor="inputAddress">Address</label>
                    <input required onChange={event => setAddress(event.target.value)} value={address} type="text"
                           className="form-control" id="inputAddress" placeholder="1234 Main St"/>
                </div>
                <div className="form-group">
                    <label htmlFor="inputAddress2">Address 2</label>
                    <input onChange={event => setAddress2(event.target.value)} value={address2}
                           type="text" className="form-control" id="inputAddress2"
                           placeholder="Apartment, studio, or floor"/>
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
                        <Select rules={{required: true}} value={countryCode} onChange={setCountryCode} styles={{
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

                        }} options={countriesDataFormated}/>
                    </div>
                </div>
                <button
                    type='submit' disabled={!countryCode.value} className="btn btn-primary">
                    Continue
                </button>
                {cancelButton()}
            </form>
    )

}

export default ShippingDetails