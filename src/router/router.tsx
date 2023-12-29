import { Navigate, createBrowserRouter } from "react-router-dom";
import { App } from "../App";
import { Login } from "../components/login/Login";
import { Error404 } from "../components/Error404";
import { Todolists } from "../components/todolists/Todolists";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Todolists/>
    },
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/error404',
        element: <Error404 />
    },
    {
        path: '*',
        element: <Navigate to={'/error404'}/>
    }
])