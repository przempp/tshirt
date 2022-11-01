// @ts-expect-error TS(6142): Module './components/createTshirtDirectory' was re... Remove this comment to see the full error message
import CreateTshirtDirectoryNew from './components/createTshirtDirectory'


function Main() {
    let table = CreateTshirtDirectoryNew()
    return (
        // @ts-expect-error TS(2304): Cannot find name 'div'.
        <div>
            // @ts-expect-error TS(2304): Cannot find name 'div'.
            <div className="d-flex justify-content-center align-items-center flex-column ">
                // @ts-expect-error TS(2304): Cannot find name 'div'.
                <div className='menu menu-directory row justify-content-center'>
                    {table}
                </div>
            </div>
        </div>
    );
}

export default Main