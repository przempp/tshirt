import {useEffect} from "react";

function Shipping() {
    useEffect(() => {
        if (window.innerWidth < 700) window.scrollTo(0, 130)
    }, [])

    return (
        <div className='shipping' style={{textAlign: 'center'}}>
            <h2>
                <p>
                    Currently <a href='https://www.redbubble.com/' >redbubble</a> is handling all the shipping and payment processing
                </p>
                <p>For questions contact us through our <a href='https://t.me/ETDsupportbot'>Telegram bot</a></p>
                {/*<p>1. SPECIFY FRONT AND BACK MOTIVE FOR YOUR ORDER, P.O. BOX OR ADDRESS WHERE YOU'D LIKE*/}
                {/*    TO HAVE IT SHIPPED TO AND ALSO IF YOU PREFER MONERO, ETHEREUM OR BITCOIN </p>*/}
                {/*<p>2. YOU WILL RECEIVE A WALLET ADDRESS AFTER YOUR ORDER IS CONFIRMED*/}
                {/*</p>*/}
                {/*<p>3. SEND TRANSACTION ID, AFTER THAT WE WILL CONFIRM ONCE WE SHIP IT OUT*/}
                {/*</p>*/}
                {/*<p>4. WE WILL DELETE ALL INFORMATION AFTER YOU CONFIRM THAT YOU HAVE RECEIVED YOUR ORDER</p>*/}
            </h2>
        </div>
        )
}

export default Shipping