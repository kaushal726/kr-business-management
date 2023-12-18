import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainnav from '../Navbar/Mainnav'
import Home from '../Home/Home'
import globalContext from '../Context/GlobalState';
import Details from '../Details/Details';

// import './HomeScreen.css'
function HomeScreen(props) {
    const { updateLogin } = useContext(globalContext);
    const handleLogout = () => {
        props.onLogin(false)
        updateLogin(false)
        localStorage.clear();
    }

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Mainnav />}>
                        <Route index element={<Home />} />
                        <Route path='/Details' element={<Details />} />
                        {/* <Route path="about" element={<About />} />
                        <Route path="contact" element={<Contact />} />
                        <Route path="project" element={<Project />} /> */}
                    </Route>
                </Routes>
            </BrowserRouter>
            <button className="text-white absolute top-0 right-0" onClick={handleLogout}>Logout</button>
        </>
    )
}

export default HomeScreen