import Select from "react-select";
import React from "react";


function ShippingMethod(
    shippingType: any, setShippingType: any,
    setShippingMethodStage: any, setPaymentMethodStage: any,
    setShippingMethod: any, shippingMethodsFormated: any,
    customStyles: any,
    cancelButton: any
) {

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='form-group'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className='col-12 pl-0'>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputShippingType">Select Shipping Method</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Select value={shippingType} onChange={e => {
                        setShippingType(e)
                    }} styles={customStyles} options={shippingMethodsFormated}/>
                </div>
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='form-group d-flex justify-content-between' >
                {cancelButton()}
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <button onClick={() => {
                    setShippingMethod()
                    setShippingMethodStage(false)
                    setPaymentMethodStage(true)
                }} className="my-button small" disabled={(!shippingType)} type='button'>Set Shipping
                </button>
            </div>
        </>
    )
}

export default ShippingMethod