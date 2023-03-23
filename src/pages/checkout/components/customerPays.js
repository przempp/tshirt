import React from "react";

function CustomerPays(
    activeOrderData,
    secondsSinceOrderPlaced,
    selectedCrypto,
    storeCryptoAddresses,
    setTransactionID,
    addPayment,
    editButton, cancelButton,
    currentOrderStage, setCurrentOrderStage
) {

    return (
        <div className='col-12 pl-0 align-self-baseline'>
            <h2>PAYMENT DETAILS:</h2>
            {(() => {
                let date = new Date(0);
                date.setSeconds(secondsSinceOrderPlaced)
                let timeString = date.toISOString().substring(11, 19);
                return (
                    <p>Time left to pay: {timeString}.</p>
                )
            })()}
            <p>{selectedCrypto} price when order was
                placed: {activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice}$</p>
            <p>Amount to
                pay: {1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100)} ({Math.round(1 / activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100) * activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice)}$)</p>
            <p></p>
            <p className='mb-0'>SEND {selectedCrypto} TO THIS
                ADDRESS: </p>
            <p style={{textTransform: 'none'}}> {storeCryptoAddresses[selectedCrypto]} </p>
            <label>Paste in the transaction ID</label>

            <input onChange={e => setTransactionID(e.target.value)} type="text" className="form-control"
                   style={{textTransform: 'none'}}
                   aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
            <div className='text-center d-flex flex-column text-center'>
                <div style={{margin: '5px'}}>
                    <button type='button' className='my-button' onClick={e => {
                        addPayment()
                        setCurrentOrderStage('finalStage')
                    }}>
                        FINALIZE AND PAY!
                    </button>
                </div>

                <div>
                    <span style={{margin: '2.5px'}}> {cancelButton()} </span>
                    {/* <span style={{margin: '2.5px'}}> {editButton(setCustomerPaysStage)} </span> */}

                </div>


            </div>
        </div>
    )

}

export default CustomerPays