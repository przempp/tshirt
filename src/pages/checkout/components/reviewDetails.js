import React from "react";

function ReviewDetails(
    activeOrderData, transitionToPayment,
    setShippingAddress, setPaymentStage, setCustomerPaysStage,
    cancelButton, editButton
) {

    return(
        <div>
            <div className={'row'}>
                <div className={'col-md-12 col-lg-6 d-flex flex-column pl-lg-4 pb-3'}>
                    <h3>SHIPPING INFO</h3>
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.fullName}</p>
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.streetLine1}</p>
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.streetLine2}</p>
                    <p className='pb-0 mb-0'>{`${activeOrderData.activeOrder.shippingAddress.city}, ${activeOrderData.activeOrder.shippingAddress.postalCode}`}</p>
                    <p className='pb-0 mb-0'>{`${activeOrderData.activeOrder.shippingAddress.province} - ${activeOrderData.activeOrder.shippingAddress.country}`}</p>
                </div>
                <div className={'col-md-12 col-lg-6 text-lg-right text-md-left d-flex flex-column'}>
                    <h3>CONTACT</h3>
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.company}</p>
                    <p className='pb-0 mb-0'>{activeOrderData.activeOrder.shippingAddress.phoneNumber}</p>
                    <p className='mt-2'>Payment with: {activeOrderData.activeOrder.shippingAddress.customFields.paymentType}</p>
                </div>
            </div>
            <div className='text-center d-flex flex-column text-center'>
                <div>
                    <button style={{ margin: '5px' }} type='button' className='my-button' onClick={e => {
                        transitionToPayment()
                        setShippingAddress()
                        setPaymentStage(false)
                        setCustomerPaysStage(true)
                    }}>
                        FINALIZE AND PAY!
                    </button>
                </div>

                <div >
                    <span style={{ margin: '2.5px' }} > {cancelButton()} </span>
                    <span style={{ margin: '2.5px' }} > {editButton(setPaymentStage)} </span>

                </div>

            </div>
        </div>
    )
}

export default ReviewDetails