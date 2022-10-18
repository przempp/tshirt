import React from "react";

function FinalizationStage(success, addPaymentData) {
    console.log(success)
    return (
        (success === true && addPaymentData && addPaymentData.addPaymentToOrder) ?
            <div className='col-12 pl-0 text-center align-self-baseline'>
                <h2>PAYMENT SUCCESSFUL!</h2>
                <p>Your order id is: {addPaymentData && addPaymentData.addPaymentToOrder.code}</p>
            </div>
            : (addPaymentData && addPaymentData.addPaymentToOrder) && <div className='col-12 pl-0 text-center align-self-baseline'>
                <h2>PAYMENT ERROR!</h2>
                <p>{addPaymentData && addPaymentData.addPaymentToOrder.message}</p>
            </div>
    )
}

export default FinalizationStage