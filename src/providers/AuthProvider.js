import React, { useState, useEffect } from "react"
//import AsyncStorage from "@react-native-community/async-storage";
import { AsyncStorage } from 'react-native';


export const AuthContext = React.createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    return (

        <AuthContext.Provider value={{
            user,
            login: (token) => {
                const User = { token }
                console.log(User)
                setUser(User)
                AsyncStorage.setItem("token", JSON.stringify(User))


            },
            logout: () => {
                setUser(null)
                AsyncStorage.removeItem("token")
            }
        }}>
            {children}
        </AuthContext.Provider>
    );
}