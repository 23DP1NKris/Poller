import { createRoot } from 'react-dom/client'
import './assets/styles/index.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from './App.jsx'
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/dashboard', element: <Dashboard /> },
])

createRoot(document.getElementById('root')).render(
    <RouterProvider  router={router}/>
)
