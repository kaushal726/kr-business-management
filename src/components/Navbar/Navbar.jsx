import React from 'react'
import { NavLink } from 'react-router-dom'

// eslint-disable-next-line
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// eslint-disable-next-line

function Navbar() {
    return (
        <nav className='bg-gradient-to-r from-red-500 to-yellow-500 p-3 flex items-center justify-center text-white md:py-4 py-3 z-40'>
            <div className='relative border-b-2 border-white md:pb-6 md:w-96 flex items-center justify-center pb-3 w-full'>
                <ul className='flex space-x-4'>
                    <li className='text-lg font-semibold'>
                        <NavLink to="/" className='hover:text-yellow-300 transition duration-300'>
                            Home
                        </NavLink>
                    </li>
                    <li className='text-lg font-semibold'>
                        <NavLink to="/Details" className='hover:text-yellow-300 transition duration-300'>
                            Details
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar