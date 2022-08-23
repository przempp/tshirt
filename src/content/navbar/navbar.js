import {
    Link
} from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar d-flex justify-content-center align-items-center flex-column">
            <div className="logo-div row">
                <h1 className='logo-text col-xl'>ENJOY THE DECLINE</h1>
            </div>
            <div className='menu row'>
                <div className='menu-item col-sm'><Link to="/">Shirts</Link></div>
                <div className='menu-item col-sm'><Link to="/shipping">Shipping</Link></div>
                <div className='menu-item col-sm'><Link to="/about">About</Link></div>
            </div>
        </div>
    )
}

export default Navbar
