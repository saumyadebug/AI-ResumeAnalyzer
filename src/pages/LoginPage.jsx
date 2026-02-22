import { Link } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'

const LoginPage = () => {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                    <p className="mt-2 text-gray-600">
                        Sign in to your account to continue
                    </p>
                </div>

                <LoginForm />

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
