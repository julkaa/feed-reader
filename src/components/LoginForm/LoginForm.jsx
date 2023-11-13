import React, {useEffect} from "react";
import styles from "./LoginForm.module.css";
import Button from "./Button";
import Input from "./Input";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../hook/useContext";
import {setDataStorage} from "../../shared/FetchApi";

const LoginForm = () => {
    const [username, setUsername] = useState('Kamren');
    const [password, setPassword] = useState('password');
    const navigate = useNavigate();
    const {isLoggedIn, toggleLogin} = useAuth();

    const fetchUsers = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const userData = await response.json();
                return userData;
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    useEffect(() => {
        console.log(isLoggedIn);
    }, [isLoggedIn]);


    const handleLogin = async (event) => {
        console.log('logging');
        event.preventDefault();

        const fetchedUsers = await fetchUsers();
        const foundUser = fetchedUsers.find(user => user.username === username);

        if (foundUser) {
            localStorage.setItem('userID', String(foundUser.id));
            toggleLogin();
            alert('Logged in!');
            setDataStorage()
            navigate('/home');
        } else {
            alert('Invalid credentials. Please try again.');
        }
    };


    return (
        <div className={styles['login-form']}>
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
                <Input
                    type="text"
                    id="username"
                    label="Username"
                    placeholder="username"
                    autoFocus={true}
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                />
                <Input
                    type="password"
                    id="password"
                    name="password"
                    label="Password"
                    placeholder="••••••••••"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button className={styles['login-btn']} type="submit" value="Submit"/>
            </form>
        </div>
    )
}


export default LoginForm;
