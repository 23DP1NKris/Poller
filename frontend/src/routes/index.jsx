import { createBrowserRouter } from "react-router-dom"
import App from "../App.jsx"
import Home from "../pages/Home.jsx"
import Registration from "../pages/Registration.jsx"
import Login from "../pages/Login.jsx"
import Support from "../pages/Support.jsx"
import Settings from "../pages/Settings.jsx"
import Results from "../pages/Results.jsx"
import Polls from "../pages/Polls.jsx"
import CreatePoll from "../pages/CreatePoll.jsx"
import Discover from "../pages/Discover.jsx"
import Dashboard from "../pages/Dashboard.jsx"
import EditPoll from "../pages/EditPoll.jsx"
import AnswerPoll from "../pages/AnswerPoll.jsx"

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/register', element: <Registration /> },
    { path: '/login', element: <Login /> },
    { path: '/home', element: <Home /> },
    { path: '/results', element: <Results /> },
    { path: '/results/:id', element: <Results /> },
    { path: '/polls', element: <Polls /> },
    { path: '/support', element: <Support /> },
    { path: '/settings', element: <Settings /> },
    { path: '/create-poll', element: <CreatePoll />},
    { path: '/discover', element: <Discover /> },
    { path: '/dashboard', element: <Dashboard /> },
    { path: '/polls/:id/edit', element: <EditPoll />},
    { path: '/poll/:id', element: <AnswerPoll /> },
])