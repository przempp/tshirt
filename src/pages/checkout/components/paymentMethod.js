import React from "react";
import { FormRadioButtons } from './helpers/formRadioButtons';
import { Form } from "react-bootstrap";

function PaymentMethod(
    setSelectedCrypto, selectedCrypto,
    setShippingAddress, shippingType,
    cancelButton,
    currentOrderStage, setCurrentOrderStage
) {
    return (
        <Form>
            <h2>Pick payment option</h2>
            <FormRadioButtons   setSelectedCrypto={setSelectedCrypto} selectedCrypto={selectedCrypto}  />
            <div className='d-flex justify-content-between'>
                {cancelButton()}
                <button onClick={e => {
                    setShippingAddress()
                    setCurrentOrderStage('paymentStage')
                }} className="my-button small" disabled={(!shippingType)} type='button'>Finalize
                </button>
            </div>
        </Form>
    )
}

export default PaymentMethod