import { useState } from 'react'
import { Eye, EyeOff, User, Mail, Lock } from 'lucide-react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import LoadingSpinner from '../ui/LoadingSpinner'
import { useAuth } from '../../hooks/useAuth'

const RegisterForm = () => {
    const { register } = useAuth()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const [showPassword, setShowPassword] = useState(false)
    const [errors, setErrors] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [registerError, setRegisterError] = useState('')

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Name is required'
        }

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

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setRegisterError('')

        if (!validateForm()) return

        setIsLoading(true)
        const result = await register({
            name: formData.name,
            email: formData.email,
            password: formData.password
        })

        if (!result.success) {
            setRegisterError(result.error)
        }

        setIsLoading(false)
    }

    return (
        <div className="space-y-6">
            {registerError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                    {registerError}
                </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div className="relative">
                        <Input
                            label="Full Name"
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            error={errors.name}
                            placeholder="John Doe"
                        />
                        <User className="absolute right-3 top-[38px] h-5 w-5 text-gray-400" />
                    </div>

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

                    <div className="relative">
                        <Input
                            label="Confirm Password"
                            type={showPassword ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                            error={errors.confirmPassword}
                            placeholder="••••••••"
                        />
                        <Lock className="absolute right-3 top-[38px] h-5 w-5 text-gray-400" />
                    </div>
                </div>

                <div className="text-sm text-gray-600">
                    By signing up, you agree to our{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">Terms of Service</a>
                    {' '}and{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-500">Privacy Policy</a>
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
                        'Create Account'
                    )}
                </Button>
            </form>
        </div>
    )
}

export default RegisterForm
