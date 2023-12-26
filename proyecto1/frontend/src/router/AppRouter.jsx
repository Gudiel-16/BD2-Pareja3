import { Route, Routes } from "react-router-dom";
import  AuthRoutes from "../auth/routes/AuthRoutes";
import { SocialRoutes } from "../social/routes/SocialRoutes";

const AppRouter = () => {

    return (
        <Routes>
            <Route path="/auth/*" element={<AuthRoutes/>}/>

            <Route path="/*" element={<SocialRoutes/>}/>
        </Routes>
    );
};

export default AppRouter;