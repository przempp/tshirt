import { Link, NavLink} from 'react-router-dom'
import React from 'react';



function Navbar() {
    return (
        <div className="navbar d-flex justify-content-center align-items-center flex-column ">
            <div className="logo-div row  ">
                <Link to={'/'}>
                    <div className="animation">

                        <h1  className='logo-text col-xl text-3d-animation'>ENJOY THE DECLINE</h1>
                    </div>
                </Link>
            </div>
            <div className='menu row'>
                <div className='menu-item col-4'>
                    <NavLink className={({ isActive }) => isActive ? "navlink-active" : ""} to="/">Shirts</NavLink></div>
                <div className='menu-item col-4'>
                    <NavLink className={({ isActive }) => isActive ? "navlink-active" : ""} to="/shipping">Shipping</NavLink></div>
                <div className='menu-item col-4'>
                    <NavLink className={({ isActive }) => isActive ? "navlink-active" : ""} to="/about">About</NavLink></div>
            </div>
        </div>
    )
}

export default Navbar
