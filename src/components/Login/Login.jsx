import React, { useContext, useEffect, useState } from 'react'
import "./Login.css"
import toast from 'react-hot-toast';
import globalContext from '../Context/GlobalState';



const Login = (props) => {
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
        const url = 'http://localhost:3000/auth/login';
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
        const url = 'http://localhost:3000/auth/register';
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
                console.log(data);
            })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
        setEmailRegister("");
        setPasswordRegister("");
        setUsernameRegister("")
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
        <div className='flex flex-wrap m-5 p-7'>
            {register ? (
                <form className='flex flex-col justify-center w-full' onSubmit={dataHandlerRegister}>
                    <div>
                        <label>
                            UserName :
                            <input
                                type='text'
                                name='name'
                                value={usernameRegister}
                                onChange={(e) => handleChangeRegister(e, "Username")}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Email :
                            <input
                                type='email'
                                name='name'
                                value={emailRegister}
                                onChange={(e) => handleChangeRegister(e, "Email")}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Enter Password :
                            <input
                                type='password'
                                name='quantity'
                                value={passwordRegister}
                                onChange={(e) => handleChangeRegister(e, "Password")}
                            ></input>
                        </label>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='glowing-btn'>
                            <span className='glowing-txt'>
                                SU<span className='faulty-letter'>BM</span>IT
                            </span>
                        </button>
                    </div>
                    <a href='/#' onClick={() => setRegister(false)}>Login!</a>
                </form>
            ) : (
                <form className='flex flex-col justify-center w-full' onSubmit={dataHandler}>
                    <div>
                        <label>
                            Enter Email :
                            <input
                                type='email'
                                name='name'
                                value={email}
                                onChange={(e) => handleChange(e, "Email")}
                            ></input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Enter Password :
                            <input
                                type='password'
                                name='quantity'
                                value={password}
                                onChange={(e) => handleChange(e, "Password")}
                            ></input>
                        </label>
                    </div>
                    <div className='flex items-center justify-center'>
                        <button className='glowing-btn'>
                            <span className='glowing-txt'>
                                SU<span className='faulty-letter'>BM</span>IT
                            </span>
                        </button>
                    </div>
                    <a href='/#' onClick={() => setRegister(true)}>Register User!</a>
                </form>
            )}
        </div>
    );

}

export default Login