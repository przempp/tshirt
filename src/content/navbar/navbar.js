import {
    Link
} from "react-router-dom";

function Navbar() {
    return (
        <div className="navbar d-flex justify-content-center align-items-center flex-column">
            <div className="logo-div row">
                <Link to={'/'}>
                    <h1 className='logo-text col-xl'>ENJOY THE DECLINE</h1>
                </Link>
            </div>
            <div className='menu row'>
                <div className='menu-item col-4'><Link to="/">Shirts</Link></div>
                <div className='menu-item col-4'><Link to="/shipping">Shipping</Link></div>
                <div className='menu-item col-4'><Link to="/about">About</Link></div>
            </div>
        </div>
    )
}

export default Navbar
