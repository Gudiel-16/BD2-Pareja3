import { Navigate, Route, Routes } from "react-router-dom";
import { Principal } from "../pages/Principal";

export const SocialRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Principal/>}/>
            <Route path="/*" element={<Navigate to="/"/>}/>
        </Routes>
    );
}