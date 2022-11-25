import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import app from '../../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);


    const [loading, setLoading] = useState(true);

    const googleProvider = new GoogleAuthProvider();
    // Create User 
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    // Email Sign In 
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    // Google Sign in 
    const GoogleLogIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    }

    // //Log out
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    // Observer to manage user 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log(currentUser);
            setUser(currentUser);
            setLoading(false);
        })
        return () => {
            return unsubscribe;
        }
    }, [])

    // Update User 
    const updateUser = (userInfo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, userInfo)
    }



    // -----Auth Result Object---- //
    const authValue = {
        user,
        loading,
        createUser,
        GoogleLogIn,
        signIn,
        logOut,
        updateUser
    }
    return (
        <AuthContext.Provider value={authValue}>
            {children};
        </AuthContext.Provider>
    );
};

export default AuthProvider;