import React, { useEffect, useState } from "react";

const AuthContext = React.createContext({
    isLoggedIn: false,
    onLogin : ()=>{},
    onLogout : () =>{}
});

export const AuthContextProvider = (props) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
        const storageLogin = localStorage.getItem("isLoggedIn");
        if (storageLogin) {
            setIsLoggedIn(true);
        }
    }, [])
    const loginHandler = (email, password) => {
        localStorage.setItem("isLoggedIn", "1");
        setIsLoggedIn(true);
    };
    const logoutHandler = () => {
        localStorage.removeItem("isLoggedIn");
        setIsLoggedIn(false);
    };

    return <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, onLogin: loginHandler, onLogout: logoutHandler }}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContext