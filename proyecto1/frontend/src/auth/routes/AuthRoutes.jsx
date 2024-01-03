import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "../pages/Login";
import { RegisterPage } from "../pages/Register";

const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={ <RegisterPage/>}/>
            <Route path="/*" element={<Navigate to="/auth/login"/>}/>
        </Routes>
    );
}

export default AuthRoutes;


