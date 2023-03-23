import Select from "react-select";
import React from "react";

function ShippingDetails(
    setShippingAddress,
    customerDetails, setCustomerDetails,
    countriesDataFormated,
    cancelButton,
    currentOrderStage, setCurrentOrderStage
) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            setShippingAddress()
            setCurrentOrderStage('shippingMethodStage')
        }}>
            <div className="form-group">
                <label htmlFor="inputAddress">Address</label>
                <input required onChange={event => setCustomerDetails({...customerDetails, address: event.target.value})} value={customerDetails.address} type="text"
                       className="form-control" id="inputAddress" placeholder="1234 Main St"/>
            </div>
            <div className="form-group">
                <label htmlFor="inputAddress2">Address 2</label>
                <input onChange={event => setCustomerDetails({...customerDetails, address2: event.target.value})} value={customerDetails.address2}
                       type="text" className="form-control" id="inputAddress2"
                       placeholder="Apartment, studio, or floor"/>
            </div>
            <div className="form-row">
                <div className="form-group col-6 ">
                    <label htmlFor="inputCity">City</label>
                    <input required onChange={event => setCustomerDetails({...customerDetails, city: event.target.value})} value={customerDetails.city}
                           type="text" className="form-control" id="inputCity"/>
                </div>
                <div className="form-group col-6 ">
                    <label htmlFor="inputState">State</label>
                    <input required onChange={event => setCustomerDetails({...customerDetails, province: event.target.value})} value={customerDetails.province}
                           id="inputState" type="text" className="form-control"/>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-5">
                    <label htmlFor="inputZip">Zip</label>
                    <input required onChange={event => setCustomerDetails({...customerDetails, zip: event.target.value})} value={customerDetails.zip}
                           type="text" className="form-control" id="inputZip"/>
                </div>
                <div className=" col-7">
                    <label htmlFor="inputCountry">Country</label>
                    <Select rules={{required: true}} value={customerDetails.countryCode} 
            
                    onChange={(newValue) => setCustomerDetails(customerDetails => ({...customerDetails, countryCode: newValue}))}
                    
                    styles={{
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
            <div className='d-flex justify-content-between'>
                {cancelButton()}
                <button className='my-button small'
                        type='submit' disabled={!customerDetails.countryCode.value}>
                    Continue
                </button>
            </div>
        </form>
    )

}

export default ShippingDetails