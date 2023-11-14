import React, {createContext, useContext, useState} from 'react';

interface AuthContextProps {
    isLoggedIn: boolean;
    toggleLogin: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    isLoggedIn: false,
    toggleLogin: () => {
    },
});

const useAuth = () => {
    return useContext(AuthContext);
};

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
