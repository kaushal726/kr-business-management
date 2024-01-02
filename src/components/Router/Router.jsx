import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainnav from '../Navbar/Mainnav';
import Home from '../Home/Home';
import globalContext from '../Context/GlobalState';
import Details from '../Details/Details';


function HomeScreen(props) {
    const { login, updateLogin, token, setToken } = useContext(globalContext);

    useEffect(() => {
        setTimeout(() => {
            handleLogout();
        }, 30 * 60 * 1000);
    }, []);
    const handleLogout = () => {
        props.onLogin(false);
        updateLogin(false);
        localStorage.clear();
    };
    useEffect(() => {
        if (!login) {
            props.onLogin(false);
            updateLogin(false);
            localStorage.clear();
        }
    }, [login])

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Mainnav />}>
                    <Route index element={<Home />} />
                    <Route path="/Details" element={<Details />} />
                </Route>
            </Routes>
        </BrowserRouter>

    );
}

export default HomeScreen;
