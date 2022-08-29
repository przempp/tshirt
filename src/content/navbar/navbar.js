import { Link, NavLink} from 'react-router-dom'
import React, { useState, useEffect } from 'react';



function Navbar(id) {
    return (
        <div className="navbar d-flex justify-content-center align-items-center flex-column">
            <div className="logo-div row">
                <Link to={'/'}>
                    <h1  className='logo-text col-xl animation'>ENJOY THE DECLINE</h1>
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
