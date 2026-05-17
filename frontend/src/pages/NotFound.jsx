import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import Logo from '../components/Logo.jsx'

function NotFound() {
    const { user, loading } = useAuth()

    return (
        <div className="min-h-screen bg-background-light flex flex-col items-center justify-center p-6 text-center">
            <div className="mb-8">
                <Logo />
            </div>
            <p className="text-8xl font-bold text-primary mb-4">404</p>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Lapa nav atrasta</h1>
            <p className="text-gray-400 mb-8 max-w-xs">
                Šāda adrese neeksistē. Iespējams, tā ir pārvietota vai izdzēsta.
            </p>
            {!loading && (
                <Link
                    to={user ? '/home' : '/'}
                    className="bg-primary text-white px-8 py-3.5 rounded-lg font-semibold text-sm tracking-wide hover:bg-opacity-90 shadow-lg shadow-primary/20 transition-all transform hover:-translate-y-0.5"
                >
                    {user ? 'Uz sākumlapu' : 'Uz galveno lapu'}
                </Link>
            )}
        </div>
    )
}

export default NotFound
