import { NavLink } from 'react-router-dom'
import {
    LayoutDashboard,
    FileText,
    BarChart3,
    Settings,
    HelpCircle,
    Zap
} from 'lucide-react'

const Sidebar = () => {
    const navItems = [
        { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
        { name: 'New Analysis', icon: FileText, path: '/dashboard/analyze' },
        { name: 'Results', icon: BarChart3, path: '/dashboard/results' },
        { name: 'Settings', icon: Settings, path: '/dashboard/settings' },
        { name: 'Help', icon: HelpCircle, path: '/dashboard/help' },
    ]

    return (
        <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 fixed h-full z-40">
            <div className="p-6">
                <NavLink to="/" className="flex items-center space-x-2">
                    <div className="bg-gradient-to-r from-primary-600 to-secondary-600 p-2 rounded-lg">
                        <Zap className="h-6 w-6 text-white" />
                    </div>
                    <span className="text-xl font-bold gradient-text">
                        SkillGap AI
                    </span>
                </NavLink>
            </div>

            <nav className="flex-1 px-4 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg font-medium transition-all duration-200 ${isActive
                                ? 'bg-primary-50 text-primary-700 border-r-4 border-primary-600'
                                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                            }`
                        }
                    >
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="p-4 border-t border-gray-200">
                <div className="bg-gradient-to-r from-primary-50 to-secondary-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-gray-900 mb-1">Pro Plan</p>
                    <p className="text-xs text-gray-600 mb-3">Unlimited analyses</p>
                    <button className="text-xs font-semibold text-primary-600 hover:text-primary-700">
                        Upgrade →
                    </button>
                </div>
            </div>
        </aside>
    )
}

export default Sidebar