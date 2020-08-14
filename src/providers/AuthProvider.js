import React, { useState, useEffect } from "react"
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';


export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    return (

        <AuthContext.Provider value={{
            user,token,
            login: (token) => {
                const User =  {token:token}
                console.log(User)
                setUser(User)
                AsyncStorage.setItem('token', JSON.stringify(User))


            },
            logout: () => {
                setUser(null)
                AsyncStorage.removeItem('token')
            },
            getToken:(token)=>{
                const User =  {token}
                setUser(User)
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}