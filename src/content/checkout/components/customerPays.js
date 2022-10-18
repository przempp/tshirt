import React from "react";

function CustomerPays(
    activeOrderData,
    secondsSinceOrderPlaced,
    selectedCrypto, cryptoPrice,
    storeCryptoAddresses,
    setTransactionID,
    addPayment,
    setCustomerPaysStage,
    setFinalStage, setCustomerDetailsStage,
    editButton, cancelButton
) {



    return(
        <div className='col-12 pl-0 align-self-baseline'>
            <h2>Put in stuff and pay:</h2>
            { (() => {
                let secondsPastSinceOrderPlaced = ((Date.parse(new Date()) -Date.parse(activeOrderData.activeOrder.shippingAddress.customFields.paymentStartDate)) / 1000)
                let date = new Date(0);
                date.setSeconds(secondsPastSinceOrderPlaced)
                let timeString = date.toISOString().substring(11, 19);
                return(
                    <>
                        <p>{timeString}</p>

                    </>

                )
            })() }

            <p>Current {selectedCrypto} price: {cryptoPrice}$</p>
            <p>{selectedCrypto} price when order was placed: {activeOrderData.activeOrder.shippingAddress.customFields.cryptoPrice}$</p>
            <p>Amount to pay: {1/cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100)} ({Math.round(1/cryptoPrice * (activeOrderData.activeOrder.totalWithTax / 100) * cryptoPrice )}$)</p>
            <p></p>
            <p className='text-capitalize'>SEND {selectedCrypto} TO THIS ADDRESS: {storeCryptoAddresses[selectedCrypto]}</p>
            <label>Paste in the transaction ID</label>
            <input onChange={e => setTransactionID(e.target.value)} type="text" className="form-control" aria-label="Small"
                   aria-describedby="inputGroup-sizing-sm"/>
            <button  type='button' onClick={e => {
                addPayment()
                setCustomerPaysStage(false)
                setFinalStage(true)
                setCustomerDetailsStage(false)

            }}>
                FINALIZE AND PAY!
            </button>
            {editButton(setCustomerPaysStage)}
            {cancelButton()}
        </div>
    )

}

export default CustomerPays