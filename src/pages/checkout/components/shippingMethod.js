import Select from "react-select";
import React from "react";


function ShippingMethod(
    shippingType, setShippingType,
    setShippingMethod, shippingMethodsFormated,
    customStyles,
    cancelButton,
    currentOrderStage, setCurrentOrderStage 
) {

    return (
        <>
            <div className='form-group'>
                <div className='col-12 pl-0'>
                    <label htmlFor="inputShippingType">Select Shipping Method</label>
                    <Select value={shippingType} onChange={e => {
                        setShippingType(e)
                    }} styles={customStyles} options={shippingMethodsFormated}/>
                </div>
            </div>
            <div className='form-group d-flex justify-content-between' >
                {cancelButton()}
                <button onClick={() => {
                    setShippingMethod()
                    setCurrentOrderStage('paymentMethodStage')
                }} className="my-button small" disabled={(!shippingType)} type='button'>Set Shipping
                </button>
            </div>
        </>
    )
}

export default ShippingMethod