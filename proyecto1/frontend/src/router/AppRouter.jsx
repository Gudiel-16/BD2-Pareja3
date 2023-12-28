import { Navigate, Route, Routes } from "react-router-dom";
import  AuthRoutes from "../auth/routes/AuthRoutes";
import { SocialRoutes } from "../social/routes/SocialRoutes";
import { CheckingAuth } from "../ui/components/CheckingAuth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { login,logout } from "../store/auth";

const AppRouter = () => {
    const dispatch = useDispatch();

    const { status } = useSelector(state => state.auth);


    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user){
            //console.log('user', user);
            const { correo, uid, username, nombre, edad, especialidad, img } = JSON.parse(user);
            dispatch(login(correo, uid, username, nombre, edad, especialidad, img))
        }else {
            dispatch(logout());
        }
    }, [status]);

    if (status === 'cheking') {
        return <CheckingAuth/>  
    }

    return (
        <Routes>

            {
                (status === 'authenticated') 
                ? <Route path="/*" element={<SocialRoutes/>}/>
                : <Route path="/auth/*" element={<AuthRoutes/>}/>
            }
            <Route path="/*" element={<Navigate to='/auth/login'/>}/>

        </Routes>
    );
};

export default AppRouter;