import ReactLoading from "react-loading";
import React from "react";


function Spinner() {
    return (
            <ReactLoading className='loading-status' type='spinningBubbles' color='grey'  />
    )
}

export default Spinner