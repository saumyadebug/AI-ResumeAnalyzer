import { Link } from 'react-router-dom'
import RegisterForm from '../components/auth/RegisterForm'

const RegisterPage = () => {
    return (
        <div className="min-h-screen gradient-bg flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-xl">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Create account</h2>
                    <p className="mt-2 text-gray-600">
                        Start analyzing your resume today
                    </p>
                </div>

                <RegisterForm />

                <div className="text-center mt-4">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
