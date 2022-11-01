import React from "react";


function CustomerDetails(
    setCustomerDetailsStage: any, setShippingDetailsStage: any, setCustomerForOrder: any,
    firstName: any, setFirstName: any,
    lastName: any, setLastName: any,
    email: any, setEmail: any,
    telegram: any, setTelegram: any,
    cancelButton: any
) {

    return (
        // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <form onSubmit={(e) => {
            e.preventDefault();
            setCustomerDetailsStage(false)
            setShippingDetailsStage(true)
            setCustomerForOrder()

        }}>
            {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <div className="form-row">
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-md-6">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputFirstName4">First Name</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input required onChange={event => setFirstName(event.target.value)} value={firstName}
                           name='firstName' type="text" id="inputFirstName4" className="form-control"
                           placeholder="First name"/>
                </div>

                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-md-6">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputLastName4">Last Name</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input required onChange={event => setLastName(event.target.value)} value={lastName} name='lastName'
                           type="text" className="form-control" placeholder="Last name"/>

                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-md-6">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputEmail4">Email</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input required onChange={event => setEmail(event.target.value)} value={email} type="email"
                           className="form-control" id="inputEmail4" placeholder="Email"/>
                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-md-6">
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <label htmlFor="inputTelegram4">Telegram</label>
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <input required onChange={event => setTelegram(event.target.value)} value={telegram} type="telegram"
                           className="form-control" id="inputTelegram4" placeholder="Telegram"/>
                </div>
                {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <div className="form-group col-md-12 d-flex justify-content-between">
                    {cancelButton()}
                    {/* @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <button className='my-button small'>Next</button>
                </div>
            </div>
        </form>
    )
}


export default CustomerDetails