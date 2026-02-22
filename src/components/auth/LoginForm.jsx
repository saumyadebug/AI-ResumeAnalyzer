import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff, Mail } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useAuth } from '../../hooks/useAuth'

const LoginForm = () => {
    const { login } = useAuth()
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [loginError, setLoginError] = useState('')

    const validateForm = () => {
        const newErrors = {}

        if (!formData.email) {
            newErrors.email = 'Email is required'
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
        }

        if (!formData.password) {
            newErrors.password = 'Password is required'
        } else if (formData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoginError('')

        if (!validateForm()) return

        setIsLoading(true)
        const result = await login({
            email: formData.email,
            password: formData.password
        })

        if (!result.success) {
            setLoginError(result.error)
        }

        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            {loginError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {loginError}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="relative">
                        <Input
                            label="Email Address"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            error={errors.email}
                            placeholder="you@example.com"
                        />
                        <Mail className="absolute right-3 top-[38px] h-5 w-5 text-gray-400" />
                    </div>

                    <div className="relative">
                        <Input
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            error={errors.password}
                            placeholder="••••••••"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-[38px] text-gray-400 hover:text-gray-600"
                        >
                            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={formData.rememberMe}
                            onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                    </label>
                    <Link to="/forgot-password" title="Forgot password?" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                        Forgot password?
                    </Link>
                </div>

                <Button
                    type="submit"
                    variant="primary"
                    className="w-full"
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <LoadingSpinner size="sm" className="text-white" />
                    ) : (
                        'Sign In'
                    )}
                </Button>
            </form>
        </div>
    )
}

export default LoginForm
