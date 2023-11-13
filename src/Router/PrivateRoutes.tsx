import {Navigate, Outlet} from "react-router-dom";
import {useAuth} from "../hook/useContext";
import {FC} from "react";

const PrivateRoutes: FC = () => {
    const {isLoggedIn} = useAuth();
    return (
        isLoggedIn ? <Outlet/> : <Navigate to={"login"}/>
    );
};

export default PrivateRoutes;
