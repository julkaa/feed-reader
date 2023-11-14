import React from "react";
import styles from "./Header.module.css";
import {useAuth} from "../../shared/useContext";
import {useLocation, useNavigate} from "react-router-dom";
import UnderlineButton from "../UI/Button/UnderlineButton";

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
            <div className={styles['topbar-text']}>Welcome To The Feed
                Reader,<span className={styles['topbar-username']}> {localStorage.getItem('userName')}!</span></div>

            <div>
                {location.pathname !== '/home' &&
                    <UnderlineButton value="Back" onClick={handleGoHome} className={styles['topbar-button']}
                                     type='button'/>}
                <UnderlineButton value="Logout" onClick={handleLogout} className={styles['topbar-button']}
                                 type='button'/>
            </div>
        </div>
    );
};

export default Header;
