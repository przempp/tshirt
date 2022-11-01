import ReactLoading from "react-loading";
import React from "react";


function Spinner() {
    return (
            // @ts-expect-error TS(17004): Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <ReactLoading className='loading-status' type='spinningBubbles' color='grey'  />
    )
}

export default Spinner