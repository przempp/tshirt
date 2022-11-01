import {Form} from "react-bootstrap";
import React from "react";

function PaymentMethod(
    setPaymentMethodStage: any, setPaymentStage: any,
    setSelectedCrypto: any, selectedCrypto: any,
    setShippingAddress: any, shippingType: any,
    cancelButton: any
) {
    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Form>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <h2>Pick payment option</h2>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Form.Check
                type={'radio'}
                id={`radio-btc`}
                label={`Bitcoin`}
                onChange={() => setSelectedCrypto('bitcoin')}
                checked={selectedCrypto === "bitcoin"}
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Form.Check
                type={'radio'}
                id={`default-eth`}
                label={`Ethereum`}
                onChange={() => setSelectedCrypto('ethereum')}
                checked={selectedCrypto === "ethereum"}
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Form.Check
                type={'radio'}
                id={`default-xmr`}
                label={`Monero`}
                onChange={() => setSelectedCrypto('monero')}
                checked={selectedCrypto === "monero"}
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Form.Check
                type={'radio'}
                id={`default-ltc`}
                label={`Litecoin`}
                onChange={() => setSelectedCrypto('litecoin')}
                checked={selectedCrypto === "litecoin"}
            />
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='d-flex justify-content-between'>
                {cancelButton()}
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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