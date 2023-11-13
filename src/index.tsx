import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomePage from "./components/Home/HomePage";
import App from "./App";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const router = createBrowserRouter([
    {
        path: "*",
        element: <App/>,
    },
    {
        path: "/login",
        element: <App/>,
    },
    {
        path: "/home",
        element: <HomePage/>,
    },
    // {
    //     path: "/feed/:id",
    //     element: <HomePage/>,
    // }
]);

root.render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
