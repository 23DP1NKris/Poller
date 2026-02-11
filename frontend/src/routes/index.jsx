import { createBrowserRouter } from "react-router-dom"
import App from '../App.jsx'
import Dashboard from "../pages/Dashboard.jsx"
import Registration from "../pages/Registration.jsx"
import Login from "../pages/Login.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/dashboard',
        element: <Dashboard />
    },
    {
        path: '/register',
        element: <Registration />
    },
    {   path: '/login',
        element: <Login />
    },
])