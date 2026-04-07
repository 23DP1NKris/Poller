import { createBrowserRouter } from "react-router-dom"
import App from '../App.jsx'
import Home from "../pages/Home.jsx"
import Registration from "../pages/Registration.jsx"
import Login from "../pages/Login.jsx"
import Support from "../pages/Support.jsx"
import Settings from "../pages/Settings.jsx"

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/home',
        element: <Home />
    },
    {
        path: '/register',
        element: <Registration />
    },
    {   path: '/login',
        element: <Login />
    },
    {
        path: '/support',
        element: <Support />
    },
    {
        path: '/settings',
        element: <Settings />
    }
])
