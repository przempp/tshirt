import {Form} from "react-bootstrap";
import React from "react";

function PaymentMethod(
    setPaymentMethodStage, setPaymentStage,
    setSelectedCrypto, selectedCrypto,
    setShippingAddress, shippingType,
    cancelButton
) {
    return (
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
            <Form.Check
                type={'radio'}
                id={`default-ltc`}
                label={`Litecoin`}
                onChange={() => setSelectedCrypto('litecoin')}
                checked={selectedCrypto === "litecoin"}
            />
            <div className='d-flex justify-content-between'>
                {cancelButton()}
                <button onClick={e => {
                    setShippingAddress()
                    setPaymentMethodStage(false)
                    setPaymentStage(true)
                }} className="my-button small" disabled={(!shippingType)} type='button'>Finalize
                </button>
            </div>
        </Form>
    )
}

export default PaymentMethod