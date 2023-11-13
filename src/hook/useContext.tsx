import React, {createContext, useContext, useState} from 'react';

// Define the shape of the context
interface AuthContextProps {
    isLoggedIn: boolean;
    toggleLogin: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    toggleLogin: () => {
    },
});

// Custom hook to access the AuthContext
const useAuth = () => {
    return useContext(AuthContext);
};

// AuthProvider component to wrap the app
const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem('isLoggedIn') === 'true'
    );

    const toggleLogin = () => {
        setIsLoggedIn((prevIsLoggedIn) => {
            const newIsLoggedIn = !prevIsLoggedIn;
            localStorage.setItem('isLoggedIn', String(newIsLoggedIn));
            return newIsLoggedIn;
        });
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, toggleLogin}}>
            {children}
        </AuthContext.Provider>
    );
};

export {AuthProvider, useAuth};
