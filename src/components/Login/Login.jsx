import React, { useContext, useEffect, useState } from 'react'
import "./Login.css"
import toast from 'react-hot-toast';
import globalContext from '../Context/GlobalState';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import 'normalize.css';
import image from '../../assets/Image/image.jpg'


const WelcomeModal = ({ onClose }) => (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75 ">
        <div className=" popup-div relative bg-green-200 p-8 rounded-md shadow-lg w-full max-w-2xl mx-4 sm:mx-8 lg:mx-auto">
            <iframe className='absolute z-50 top-12 right-36  w-96 left-0' src="https://lottie.host/embed/5e372765-3513-4d85-8e36-8f3b3417e4a5/TKgTo1byJi.json"></iframe>
            <svg
                className="absolute bottom-0 right-0 mb-8 text-blue-500 opacity-25"
                fill="currentColor"
                viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
            </svg>

            <button
                className="absolute top-2 text-2xl right-4 text-white hover:text-blue-900 focus:outline-none z-10"
                onClick={onClose}>
                <FontAwesomeIcon icon={faTimes} size="lg" />
            </button>

            <h1 className="text-xl md:text-4xl font-extrabold mb-6 text-center text-gray-800 z-10 relative">
                🔥 Welcome to Kaushal's Business Hub! 🔥
            </h1>
            <p className="w-full text-center text-base md:text-lg font-semibold text-black relative z-10">
                Hello, I'm Kaushal, the brains behind this cutting-edge business management platform.
                Elevate your business operations with our innovative solutions designed for efficiency and success.
            </p>
            <iframe className='absolute z-50 top-12 right-0  w-96 left-42' src="https://lottie.host/embed/5e372765-3513-4d85-8e36-8f3b3417e4a5/TKgTo1byJi.json"></iframe>
            <p className="text-sm md:text-md text-center mt-6 text-black relative z-10">Take control, thrive in excellence.</p>
            <svg
                className="absolute top-0 right-0 mt-8 text-blue-500 opacity-25"
                fill="currentColor"
                viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="50" />
            </svg>
        </div>
    </div>

);

const Login = (props) => {
    const [showWelcomeModal, setShowWelcomeModal] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailRegister, setEmailRegister] = useState("");
    const [passwordRegister, setPasswordRegister] = useState("");
    const [usernameRegister, setUsernameRegister] = useState("");
    // eslint-disable-next-line
    // const [token, setToken] = useState("")
    const [register, setRegister] = useState(false);
    // eslint-disable-next-line
    const { login, updateLogin, setToken } = useContext(globalContext);
    const closeWelcomeModal = () => {
        setShowWelcomeModal(false);
    };




    useEffect(() => {
        let auth = JSON.parse(localStorage.getItem("loginauth"));
        if (auth) {
            setToken(auth);
            updateLogin(true);
            props.onLogin(true);
        }
        // eslint-disable-next-line
    }, [])

    const dataHandler = (e) => {
        e.preventDefault();
        console.log(email, password);
        const url = 'https://nodejs-api-bm.onrender.com/auth/login';
        const data = {
            email: email,
            password: password
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setToken(data);
                let key = Object.keys(data);
                if (key[0] === "accessToken") {
                    props.onLogin(data)
                    updateLogin(true);
                    toast.success('Successfully Login!');
                    localStorage.setItem("loginauth", JSON.stringify(data));
                }
                else {
                    toast.error('Login Failed! Try Again');
                }

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
                toast.error(' Try Again');
            });
        setEmail("");
        setPassword("");
    }
    const handleChange = (e, type) => {
        if (type === "Email") {
            setEmail(e.target.value);
        }
        else {
            setPassword(e.target.value)
        }
    }
    const dataHandlerRegister = (e) => {
        e.preventDefault();
        const url = 'https://nodejs-api-bm.onrender.com/auth/register';
        const data = {
            username: usernameRegister,
            email: emailRegister,
            password: passwordRegister
        };
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        };

        fetch(url, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                toast.success('User Created Successfully !! ');

            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        setEmailRegister("");
        setPasswordRegister("");
        setUsernameRegister("");
        setRegister(false)
    }

    const handleChangeRegister = (e, type) => {
        if (type === "Email") {
            setEmailRegister(e.target.value);
        }
        else if (type === "Username") {
            setUsernameRegister(e.target.value);
        }
        else {
            setPasswordRegister(e.target.value)
        }
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen   bg-add  ">
            {showWelcomeModal && <WelcomeModal onClose={closeWelcomeModal} />}
            <div className=' flex flex-col md:flex-row justify-between items-center md:w-4/6 md:h-5/6 h-9/12 w-7/12  shadow-2xl'>
                <div className=' md:w-1/2 w-80 h-full'>
                    <img className='  h-full w-full bg-cover' src={image} />
                </div>
                <form className=" bg-login-blue p-8  flex flex-col items-center justify-center md:w-1/2 w-80 h-full " onSubmit={register ? dataHandlerRegister : dataHandler}>
                    <h1 className="text-3xl  font-sans font-bold mb-6 text-center text-white ">
                        {register ? 'Register' : 'Login'}
                    </h1>

                    {register ? (
                        <div className='w-72'>
                            <label className="block text-white mb-2">
                                UserName :
                                <input
                                    type="text"
                                    name="name"
                                    value={usernameRegister}
                                    onChange={(e) => handleChangeRegister(e, "Username")}
                                    className="mt-1 p-2 font-normal text-black  w-full border rounded-md outline-blue-500 "
                                    required
                                    placeholder='Enter Your Username'
                                />
                            </label>

                            <label className="block text-White text-white mb-2">
                                Email :
                                <input
                                    type="email"
                                    name="name"
                                    value={emailRegister}
                                    onChange={(e) => handleChangeRegister(e, "Email")}
                                    className="mt-1 p-2 font-normal text-black  w-full border rounded-md outline-blue-500"
                                    required
                                    placeholder='Enter Your Email'

                                />
                            </label>

                            <label className="block text-white  mb-2">
                                Enter Password :
                                <input
                                    type="password"
                                    name="quantity"
                                    value={passwordRegister}
                                    onChange={(e) => handleChangeRegister(e, "Password")}
                                    className="mt-1 p-2 font-normal text-black  w-full border rounded-md outline-blue-500"
                                    required
                                    placeholder='Enter Your Password'

                                />
                            </label>

                            <div className="flex items-center justify-center">
                                <button className="bg-blue-600 w-full text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-red-300">
                                    Submit
                                </button>
                            </div>

                            <p className="text-white  text-center mt-4">Already have an account? <a href="/#" onClick={() => setRegister(false)} className="text-blue-500 font-bold">Login!</a></p>
                        </div>
                    ) : (
                        <div className='w-72 rounded-lg'>
                            <label className="block text-white  mb-2">
                                Enter Email :
                                <input
                                    type="email"
                                    name="name"
                                    value={email}
                                    onChange={(e) => handleChange(e, "Email")}
                                    className="mt-1 p-2 font-normal text-black w-full border rounded-md outline-blue-500"
                                    required
                                    placeholder='Enter Your Email'

                                />
                            </label>

                            <label className="block text-white  mb-2">
                                Enter Password :
                                <input
                                    type="password"
                                    name="quantity"
                                    value={password}
                                    onChange={(e) => handleChange(e, "Password")}
                                    className="mt-1 p-2 font-normal text-black w-full border rounded-md outline-blue-500"
                                    required
                                    placeholder='Enter Your Passwords'

                                />
                            </label>

                            <div className="flex items-center justify-center">
                                <button className="bg-blue-600 w-full text-white px-4 py-2 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:border-red-300">
                                    Submit
                                </button>
                            </div>

                            <p className="text-white  text-center mt-4">Don't have an account? <a href="/#" onClick={() => setRegister(true)} className="text-blue-500  font-bold">Register User!</a></p>
                        </div>
                    )}
                </form>
            </div>
        </div>


    );

}

export default Login