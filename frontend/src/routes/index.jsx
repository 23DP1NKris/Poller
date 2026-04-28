import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import Home from "../pages/Home.jsx"
import Registration from "../pages/Registration.jsx"
import Login from "../pages/Login.jsx"
import Support from "../pages/Support.jsx"
import Settings from "../pages/Settings.jsx"
import Results from "../pages/Results.jsx"
import ActivePolls from "../pages/ActivePolls.jsx"
import CreatePoll from "../pages/CreatePoll.jsx";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/register', element: <Registration /> },
    { path: '/login', element: <Login /> },
    { path: '/home', element: <Home /> },
    { path: '/results', element: <Results /> },
    { path: '/active-polls', element: <ActivePolls /> },
    { path: '/support', element: <Support /> },
    { path: '/settings', element: <Settings /> },
    { path: '/create-poll', element: <CreatePoll />}
])