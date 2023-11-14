import React, {useState} from "react";
import styles from "./LoginForm.module.css";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../shared/useContext";
import {fetchUsers, setDataStorage} from "../../shared/FetchApi";
import Loader from "../UI/Loader";
import FormBlock from "../UI/FormBlock";

const LoginForm: React.FC = () => {
    const [username, setUsername] = useState<string>('Kamren');
    const [password, setPassword] = useState<string>('password');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigate = useNavigate();
    const {toggleLogin} = useAuth();

    const handleLogin = async (event) => {
        event.preventDefault();

        const fetchedUsers: any[] = await fetchUsers();
        const foundUser = fetchedUsers.find((user) => user.username === username);

        if (foundUser) {
            setIsLoading(true);
            localStorage.setItem('userID', String(foundUser.id));
            localStorage.setItem('userName', String(foundUser.name));

            if (!JSON.parse(localStorage.getItem('feeds'))) {
                await setDataStorage();
            }

            toggleLogin();
            const timer = setTimeout(() => {
                setIsLoading(false);
                navigate('/home');
            }, 3000);
            return () => clearTimeout(timer);
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <>
            {isLoading ? <Loader/> :
                <FormBlock onSubmit={handleLogin}
                           onChangeFirst={{
                               name: 'username',
                               label: 'Username',
                               value: username,
                               onClick: (event) => setUsername(event.target.value)
                           }}
                           onChangeSecond={{
                               name: 'password',
                               label: 'Password',
                               value: password,
                               onClick: (event) => setPassword(event.target.value)
                           }}
                           title='Login' className={styles['login-form']}/>

            }
        </>
    );
};

export default LoginForm;
