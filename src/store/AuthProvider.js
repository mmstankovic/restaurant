import AuthContext from "./auth-context";
import { useEffect, useState } from "react";

let logoutTimer

const calculateRemainingTime = (expirationTime) => {
    const currentTime = new Date().getTime()
    const adjExpirationTime = new Date(expirationTime).getTime()

    const remainingTime = adjExpirationTime - currentTime

    return remainingTime
}

const retrieveStoreToken = () => {
    const storedToken = localStorage.getItem('token')
    const storedExpirationTime = localStorage.getItem('expirationTime')

    const remainingTime = calculateRemainingTime(storedExpirationTime)

    if(remainingTime < 3600) {
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')
        return null
    }

    return {
        token: storedToken,
        duration: remainingTime
    }
}

const AuthContextProvider = (props) => {
    const tokenData = retrieveStoreToken()

    let initialToken

    if(tokenData) {
        initialToken = tokenData.token
    }

    const [token, setToken] = useState(initialToken)

    const userIsLoggedIn = !!token

    const logoutHandler = () => {
        setToken(null)
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime')

        if(logoutTimer) {
            clearTimeout(logoutTimer)
        }
    }

    const loginHandler = (token, expirationTime) => {
        setToken(token)
       localStorage.setItem('token', token)
       localStorage.setItem('expirationTime', expirationTime)

       const remainingTime = calculateRemainingTime(expirationTime)
       
       logoutTimer = setTimeout(logoutHandler, remainingTime)
    }

    useEffect(() => {
        if(tokenData) {
            logoutTimer = setTimeout(logoutHandler, tokenData.duration)
        }
    }, [tokenData])

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>
        {props.children}
    </AuthContext.Provider>
}
export default AuthContextProvider
