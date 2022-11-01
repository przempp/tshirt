import React from "react";

function FinalizationStage(success: any, addPaymentData: any) {
    console.log(success)
    return (
        (success === true && addPaymentData && addPaymentData.addPaymentToOrder) ?
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <div className='col-12 pl-0 text-center align-self-baseline'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h2>PAYMENT SUCCESSFUL!</h2>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p>Your order id is: {addPaymentData && addPaymentData.addPaymentToOrder.code}</p>
            </div>
            : // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              (addPaymentData && addPaymentData.addPaymentToOrder) && <div className='col-12 pl-0 text-center align-self-baseline'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <h2>PAYMENT ERROR!</h2>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <p>{addPaymentData && addPaymentData.addPaymentToOrder.message}</p>
            </div>
    )
}

export default FinalizationStage