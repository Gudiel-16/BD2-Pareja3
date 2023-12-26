import { Navigate, Route, Routes } from "react-router-dom";
import { Perfil } from "../pages/Perfil";

export const SocialRoutes = () => {
    return (
        <Routes>
            <Route path="/perfil" element={<Perfil/>}/>
            <Route path="/*" element={<Navigate to="/auth/login"/>}/>
        </Routes>
    );
}