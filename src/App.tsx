import React from 'react';
import './App.css';
import LoginForm from "./components/LoginForm/LoginForm";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import PrivateRoutes from "./Router/PrivateRoutes";
import HomePage from "./components/Home/HomePage";
import {AuthProvider} from "./shared/useContext";
import Loader from "./components/UI/Loader";

const App: React.FC = () => {

    return (
        <AuthProvider>
            <div className="App">
                <Router>
                    <Routes>
                        <Route element={<PrivateRoutes/>}>
                            <Route element={<HomePage/>} path={"/home"}/>
                            <Route element={<HomePage/>} path={"/feed/:id"}/>
                            <Route element={<Navigate replace to="/home"/>} path={"*"}/>
                        </Route>
                        <Route element={<LoginForm/>} path={"/login"}/>
                    </Routes>
                </Router>
            </div>
        </AuthProvider>
    );
}

export default App;
