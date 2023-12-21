import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainnav from '../Navbar/Mainnav';
import Home from '../Home/Home';
import globalContext from '../Context/GlobalState';
import Details from '../Details/Details';

function HomeScreen(props) {
    const { updateLogin } = useContext(globalContext);

    const handleLogout = () => {
        props.onLogin(false);
        updateLogin(false);
        localStorage.clear();
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-red-500 to-yellow-500 text-white">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Mainnav />}>
                        <Route index element={<Home />} />
                        <Route path="/Details" element={<Details />} />
                    </Route>
                </Routes>
            </BrowserRouter>
            <button
                className="text-white bg-gradient-to-r from-red-500 to-yellow-500 p-2 rounded-full absolute top-0 right-0 m-4"
                onClick={handleLogout}
            >
                Logout
            </button>
        </div>
    );
}

export default HomeScreen;
