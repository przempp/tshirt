import Select from "react-select";
import React from "react";

function ShippingDetails(
    setShippingAddress: any, setShippingMethodStage: any, setShippingDetailsStage: any,
    setAddress: any, address: any,
    address2: any, setAddress2: any,
    city: any, setCity: any,
    province: any, setProvince: any,
    zip: any, setZip: any,
    countryCode: any, setCountryCode: any,
    countriesDataFormated: any,
    cancelButton: any
) {
    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form onSubmit={(e) => {
            e.preventDefault();
            setShippingAddress()
            setShippingMethodStage(true)
            setShippingDetailsStage(false)
        }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="form-group">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <label htmlFor="inputAddress">Address</label>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <input required onChange={event => setAddress(event.target.value)} value={address} type="text"
                       className="form-control" id="inputAddress" placeholder="1234 Main St"/>
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="form-group">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <label htmlFor="inputAddress2">Address 2</label>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <input onChange={event => setAddress2(event.target.value)} value={address2}
                       type="text" className="form-control" id="inputAddress2"
                       placeholder="Apartment, studio, or floor"/>
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="form-row">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-6 ">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputCity">City</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input required onChange={event => setCity(event.target.value)} value={city}
                           type="text" className="form-control" id="inputCity"/>
                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-6 ">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputState">State</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input required onChange={event => setProvince(event.target.value)} value={province}
                           id="inputState" type="text" className="form-control"/>
                </div>
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="form-row">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-5">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputZip">Zip</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input required onChange={event => setZip(event.target.value)} value={zip}
                           type="text" className="form-control" id="inputZip"/>
                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className=" col-7">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputCountry">Country</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='d-flex justify-content-between'>
                {cancelButton()}
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button className='my-button small'
                        type='submit' disabled={!countryCode.value}>
                    Continue
                </button>
            </div>
        </form>
    )

}

export default ShippingDetails