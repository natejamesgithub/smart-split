import React, { createContext, useContext, useEffect, useState } from "react";
import {
    getAuth,
    signInWithEmailAndPassword, 
    signOut,
    onAuthStateChanged, 
} from "firebase/auth"
import { app } from "../firebase";

const AuthContext = createContext(); 
export const useAuth = () => useContext(AuthContext); 

export const AuthProvider = ({ children }) => {
    const auth = getAuth(app); 
    const [user, setUser] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            setUser(firebaseUser); 
            setLoading(false); 
        }); 

    }, [auth]); 

    const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password); 
    const login = (email, password) => signInWithEmailAndPassword(auth, email, password); 
    const logout = () => signOut(auth); 

    return (
        <AuthContext.Provider value = {{ user, login, signup, logout }}>
            {!loading && children}
        </AuthContext.Provider>
    ); 
};

