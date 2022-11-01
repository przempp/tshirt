import React from "react";

function ReviewDetails(
    activeOrderData: any, transitionToPayment: any,
    setShippingAddress: any, setPaymentStage: any, setCustomerPaysStage: any,
    cancelButton: any, editButton: any
) {

    return(
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className={'row'}>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className={'col-md-12 col-lg-6 d-flex flex-column pl-lg-4 pb-3'}>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <h3>SHIPPING INFO</h3>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.fullName}</p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.streetLine1}</p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.streetLine2}</p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='pb-0 mb-0'>{`${activeOrderData.activeOrder.shippingAddress.city}, ${activeOrderData.activeOrder.shippingAddress.postalCode}`}</p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='pb-0 mb-0'>{`${activeOrderData.activeOrder.shippingAddress.province} - ${activeOrderData.activeOrder.shippingAddress.country}`}</p>
                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className={'col-md-12 col-lg-6 text-lg-right text-md-left d-flex flex-column'}>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <h3>CONTACT</h3>
                    {/*{console.log(activeOrderData.activeOrder.shippingAddress.customFields.paymentType)}*/}
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.company}</p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.phoneNumber}</p>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <p className='mt-2'>Payment with: {activeOrderData.activeOrder.shippingAddress.customFields.paymentType}</p>
                </div>
            </div>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className='text-center d-flex flex-column text-center'>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button style={{ margin: '5px' }} type='button' className='my-button' onClick={e => {
                        transitionToPayment()
                        setShippingAddress()
                        // console.log('Zmiana na arranging payment POSZLA!')
                        setPaymentStage(false)
                        setCustomerPaysStage(true)

                    }}>
                        FINALIZE AND PAY!
                    </button>
                </div>

                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div >
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span style={{ margin: '2.5px' }} > {cancelButton()} </span>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <span style={{ margin: '2.5px' }} > {editButton(setPaymentStage)} </span>

                </div>

            </div>
        </div>
    )
}

export default ReviewDetails