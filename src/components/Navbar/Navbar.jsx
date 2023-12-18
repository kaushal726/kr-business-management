import React from 'react'
import { NavLink } from 'react-router-dom'

// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// eslint-disable-next-line

function Navbar() {
    return (
        <nav className='  p-3 flex items-center justify-center  text-black md:py-4 py-3 z-40 '>
            <div className='relative tablet:text-neutral-100  border-b-2 border-grey md:pb-6 md:w-96  flex items-center justify-center pb-3 w-72 z-40'>
                <ul className='flex'>
                    <li className="">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="">
                        <NavLink to="/Details">Details</NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar