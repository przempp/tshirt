import React from "react";

function CustomerPays(
    activeOrderData: any,
    secondsSinceOrderPlaced: any,
    selectedCrypto: any,
    storeCryptoAddresses: any,
    setTransactionID: any,
    addPayment: any,
    setCustomerPaysStage: any,
    setFinalStage: any, setCustomerDetailsStage: any,
    editButton: any, cancelButton: any
) {

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div className='col-12 pl-0 align-self-baseline'>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <h2>PAYMENT DETAILS:</h2>
            {(() => {
                let date = new Date(0);
                date.setSeconds(secondsSinceOrderPlaced)
                let timeString = date.toISOString().substring(11, 19);
                return (
                    // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <p>Time left to pay: {timeString}.</p>
                )
            })()}
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>{selectedCrypto} price when order was
                placed: {activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice}$</p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p>Amount to
                pay: {1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100)} ({Math.round(1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100) * activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice)}$)</p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p></p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p className='mb-0'>SEND {selectedCrypto} TO THIS
                ADDRESS: </p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <p style={{textTransform: 'none'}}> {storeCryptoAddresses[selectedCrypto]} </p>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <label>Paste in the transaction ID</label>

            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <input onChange={e => setTransactionID(e.target.value)} type="text" className="form-control"
                   style={{textTransform: 'none'}}
                   aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='text-center d-flex flex-column text-center'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div style={{margin: '5px'}}>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button type='button' className='my-button' onClick={e => {
                        addPayment()
                        setCustomerPaysStage(false)
                        setFinalStage(true)
                        setCustomerDetailsStage(false)

                    }}>
                        FINALIZE AND PAY!
                    </button>
                </div>

                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span style={{margin: '2.5px'}}> {cancelButton()} </span>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span style={{margin: '2.5px'}}> {editButton(setCustomerPaysStage)} </span>

                </div>


            </div>
        </div>
    )

}

export default CustomerPays