import { Link, NavLink} from 'react-router-dom'
import React, { useState, useEffect } from 'react';



function Navbar(id) {
    const [angle, setAngle] = useState(0);
    const [direction, setDirection] = useState('up');
    const [isMale, setIsMale] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (direction === 'up') setAngle(angle + 0.1);
            if (direction === 'down') setAngle(angle - 0.1);
            if (angle >= 2.5) setDirection('down')
            if (angle <= -2.5) setDirection('up')
        }, 25);

        return () => clearInterval(interval);
    }, [angle]);



    const transform = `rotate(${angle}deg)`;
    return (
        <div className="navbar d-flex justify-content-center align-items-center flex-column">
            <div className="logo-div row">
                <Link to={'/'}>
                    <h1  style={{ transform,}} className='logo-text col-xl'>ENJOY THE DECLINE</h1>
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
