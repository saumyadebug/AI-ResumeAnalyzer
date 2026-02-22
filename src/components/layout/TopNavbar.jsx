import { useAuth } from '../../hooks/useAuth'
import { Bell, User, LogOut, Menu } from 'lucide-react'
import { useState } from 'react'

const TopNavbar = () => {
    const { user, logout } = useAuth()
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    return (
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-6 sticky top-0 z-30">
            <div className="flex items-center lg:hidden">
                <button className="p-2 text-gray-600 hover:text-gray-900">
                    <Menu className="h-6 w-6" />
                </button>
            </div>

            <div className="flex-1" />

            <div className="flex items-center space-x-4">
                <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        <div className="h-8 w-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white font-semibold">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <span className="hidden md:block font-medium text-gray-700">
                            {user?.name || 'User'}
                        </span>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 animate-fade-in">
                            <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-50">
                                <User className="h-4 w-4 mr-2" />
                                Profile
                            </a>
                            <button
                                onClick={logout}
                                className="w-full flex items-center px-4 py-2 text-red-600 hover:bg-red-50"
                            >
                                <LogOut className="h-4 w-4 mr-2" />
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}

export default TopNavbar