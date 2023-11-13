import React, {useState} from "react";
import styles from "./LoginForm.module.css";
import Button from "./Button";
import Input from "./Input";
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../shared/useContext";
import {fetchUsers, setDataStorage} from "../../shared/FetchApi";

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
            await setDataStorage();
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
        <div className={styles['login-form']}>
            {isLoading ? <h1>Loading...</h1> : <h1>Login</h1>}
            {!isLoading && (
                <form onSubmit={handleLogin}>
                    <Input
                        type="text"
                        id="username"
                        name="username"
                        label="Username"
                        placeholder="username"
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                    />
                    <Input
                        type="password"
                        id="password"
                        name="password"
                        label="Password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <Button className={styles['login-btn']} type="submit" value="Submit"/>
                </form>
            )}
        </div>
    );
};

export default LoginForm;
