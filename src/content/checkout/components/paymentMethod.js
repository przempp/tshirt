import {Form} from "react-bootstrap";
import React from "react";

function PaymentMethod(
    setPaymentMethodStage, setPaymentStage,
    setSelectedCrypto, selectedCrypto,
    setShippingAddress, shippingType,
    cancelButton
) {
    return(
        <Form>
            <h2>Pick payment option</h2>
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
            {cancelButton()}
        </Form>
    )
}

export default PaymentMethod