import React from "react";

function CustomerDetails(
    customerDetails, setCustomerDetails,
    setCustomerForOrder,
    cancelButton, setCurrentOrderStage
) {
    return (
        <form onSubmit={(e) => {
            e.preventDefault();
            setCustomerForOrder()
        
            setCurrentOrderStage('shippingDetailsStage')
        }}>
            <div className="form-row">
                <div className="form-group col-md-6">
                    <label htmlFor="inputFirstName4">First Name</label>
                    <input required onChange={event => 
                    
                    setCustomerDetails({
                        ...customerDetails,
                        firstName: event.target.value,
                      })
                    
                
                
                } value={customerDetails.firstName}



                           name='firstName' type="text" id="inputFirstName4" className="form-control"
                           placeholder="First name"/>
                </div>

                <div className="form-group col-md-6">
                    <label htmlFor="inputLastName4">Last Name</label>
                    <input required onChange={event => 
                    setCustomerDetails({
                        ...customerDetails,
                        lastName: event.target.value,
                      })
                    
                
                } value={customerDetails.lastName} name='lastName'
                           type="text" className="form-control" placeholder="Last name"/>

                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputEmail4">Email</label>
                    <input required onChange={event => setCustomerDetails({
                        ...customerDetails,
                        email: event.target.value,
                      })} value={customerDetails.email} type="email"
                           className="form-control" id="inputEmail4" placeholder="Email"/>
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="inputTelegram4">Telegram</label>
                    <input required onChange={event => setCustomerDetails({
                        ...customerDetails,
                        telegram: event.target.value,
                      })} value={customerDetails.telegram} type="telegram"
                           className="form-control" id="inputTelegram4" placeholder="Telegram"/>
                </div>
                <div className="form-group col-md-12 d-flex justify-content-between">
                    {cancelButton()}
                    <button className='my-button small'>Next</button>
                </div>
            </div>
        </form>
    )
}


export default CustomerDetails