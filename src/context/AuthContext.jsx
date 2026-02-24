import { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import authService from '../services/authService'

export const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    // Check for existing token on mount
    useEffect(() => {
        const initAuth = () => {
            const token = localStorage.getItem('token')
            const savedUser = localStorage.getItem('user')

            if (token && savedUser) {
                try {
                    setUser(JSON.parse(savedUser))
                    setIsAuthenticated(true)
                } catch (error) {
                    console.error('Error parsing user data:', error)
                    logout()
                }
            }
            setIsLoading(false)
        }

        initAuth()
    }, [])

    const login = useCallback(async (credentials) => {
        try {
            const response = await authService.login(credentials)
            const { token, ...userData } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(userData))

            setUser(userData)
            setIsAuthenticated(true)
            navigate('/dashboard')

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Login failed. Please try again.'
            }
        }
    }, [navigate])

    const register = useCallback(async (userData) => {
        try {
            const response = await authService.register(userData)
            const { token, ...newUser } = response.data

            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(newUser))

            setUser(newUser)
            setIsAuthenticated(true)
            navigate('/dashboard')

            return { success: true }
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Registration failed. Please try again.'
            }
        }
    }, [navigate])

    const logout = useCallback(() => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
        setIsAuthenticated(false)
        navigate('/login')
    }, [navigate])

    const value = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}