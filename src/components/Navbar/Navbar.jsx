import { NavLink } from 'react-router-dom'
import React, { useContext, useEffect, useState } from 'react';
import globalContext from '../Context/GlobalState';
import businessSVG from '../../assets/svg/business.svg'


function Navbar() {
    const { login, updateLogin, token, setToken } = useContext(globalContext);

    let handleLogout = () => {
        updateLogin(false);
    }
    return (
        <div className=" flex justify-center items-center  w-100 " >
            <nav className=" bg-gray-300 shadow-lg my-3 rounded-full w-11/12 flex items-center justify-between px-6 py-4 ">
                <div className="flex justify-between items-center">
                    <div className="md:flex justify-center items-center h-full w-full">
                        <NavLink className="text-gray-600 text-lg font-semibold italic hover:text-gray-900 flex justify-center items-center" to="/"><img className='flex justify-center items-center ' width={25} src={businessSVG} alt="Your SVG" /></NavLink>
                        <div className='flex justify-start space-x-4 items-center ml-1 w-96 '>
                            <NavLink className="text-gray-600 text-lg font-semibold italic hover:text-gray-900 flex justify-center items-center ml-2" to="/">Synex-BM</NavLink>
                            <NavLink className="text-gray-600 text-lg font-semibold italic hover:text-gray-900 flex justify-center items-center ml-2" to="/Details">Entry</NavLink>

                        </div>
                    </div>
                </div>
                <div className="items-center space-x-4 md:flex">
                    <button className="tracking-tight font-semibold">Create an account</button>
                    <button className="text-red-600 tracking-tighter font-semibold" onClick={handleLogout} >Log Out </button>
                </div>
            </nav>
        </div>

    )
}

export default Navbar