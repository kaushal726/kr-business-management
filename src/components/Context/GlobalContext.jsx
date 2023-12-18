import { useState } from "react";
import globalContext from "./GlobalState";

const NoteState = ({ children }) => {
    const [login, setLogin] = useState(false);
    const [token, setToken] = useState()
    const updateLogin = (value) => {
        setLogin(value);
    }
    let context = {
        login,
        updateLogin,
        token,
        setToken
    }
    return (
        <globalContext.Provider value={context}>
            {children}
        </globalContext.Provider>
    )
}

export default NoteState