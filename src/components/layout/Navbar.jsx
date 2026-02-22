import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { Menu, X, Zap } from 'lucide-react'
import { useState } from 'react'
import Button from '../ui/Button'

const Navbar = () => {
    const { isAuthenticated } = useAuth()
    const [isOpen, setIsOpen] = useState(false)
    const location = useLocation()

    const isActive = (path) => location.pathname === path

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
    ]

    return (
        <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                                <Zap className="h-6 w-6 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">
                                SkillGap AI
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}

                        {isAuthenticated ? (
                            <Button to="/dashboard" variant="primary">
                                Dashboard
                            </Button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link
                                    to="/login"
                                    className="text-gray-600 hover:text-primary-600 font-medium"
                                >
                                    Sign In
                                </Link>
                                <Button to="/register" variant="primary">
                                    Get Started
                                </Button>
                            </div>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-600 hover:text-gray-900 focus:outline-none"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-200">
                    <div className="px-4 pt-2 pb-4 space-y-1">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="block px-3 py-2 text-gray-600 hover:text-primary-600 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="block px-3 py-2 text-primary-600 font-medium"
                                onClick={() => setIsOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="block px-3 py-2 text-gray-600 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="block px-3 py-2 text-primary-600 font-medium"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get Started
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar