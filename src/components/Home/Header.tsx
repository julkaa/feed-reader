import React from "react";
import Button from "../LoginForm/Button";
import styles from "./Header.module.css";
import {useAuth} from "../../hook/useContext";
import {useLocation, useNavigate} from "react-router-dom";

const Header: React.FC = () => {
    const {toggleLogin} = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = (): void => {
        toggleLogin();
    };

    const handleGoHome = (): void => {
        navigate('/home');
    };

    return (
        <div className={styles.topbar}>
            <div className={styles['topbar-text']}>Welcome To The Feed Reader!</div>
            <div>
                {location.pathname !== '/home' &&
                    <Button value="Back" onClick={handleGoHome} className={styles['topbar-button']} type='button'/>}
                <Button value="Logout" onClick={handleLogout} className={styles['topbar-button']} type='button'/>
            </div>
        </div>
    );
};

export default Header;
