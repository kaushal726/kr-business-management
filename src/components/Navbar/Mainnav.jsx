import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const Mainnav = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Mainnav