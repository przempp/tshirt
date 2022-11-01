

function Footer() {

    return(
        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div className='py-5'>
            // @ts-expect-error TS(2304): Cannot find name 'p'.
            <p className='text-center small'>Enjoy The Decline 2022</p>
        </div>
    )

}

export default Footer