import axios from "axios";
import { createContext, useEffect, useState } from "react";
import service from "../services/config.services";

const AuthContext = createContext()

function AuthWrapper(props) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loggedUserId, setLoggedUserId] = useState(null);
    const [isAuthenticatingUser, setIsAuthenticatingUser] = useState(true);
    const [userRole, setUserRole] = useState(null);

    useEffect(()=>{
        authenticateUser()
    }, [])

    async function authenticateUser(){
        try {

            const response = await service.get(`/auth/verify`)

            console.log(response)

            setIsLoggedIn(true)
            setLoggedUserId(response.data.payload._id)
            setUserRole(response.data.payload.role)
            setIsAuthenticatingUser(false)
        } catch (error) {
            console.log(error)
            setIsLoggedIn(false)
            setLoggedUserId(null)
            setUserRole(null)
            setIsAuthenticatingUser(false)
        }
    }

    const passedContext = {
        isLoggedIn,
        loggedUserId,
        userRole,
        authenticateUser
    }

    if(isAuthenticatingUser === true){
        return <h3>...validando usuario</h3>
    }

    return(
        <AuthContext.Provider value={passedContext}>
        {props.children}
        </AuthContext.Provider>
    )
        
}

export {
    AuthWrapper,
    AuthContext
}