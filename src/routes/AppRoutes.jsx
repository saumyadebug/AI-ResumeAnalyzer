import { Routes, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import MainLayout from '../layouts/MainLayout'
import DashboardLayout from '../components/layout/DashboardLayout'

// Pages
import LandingPage from '../pages/LandingPage'
import LoginPage from '../pages/LoginPage'
import RegisterPage from '../pages/RegisterPage'
import DashboardPage from '../pages/DashboardPage'
import AnalysisPage from '../pages/AnalysisPage'
import ResultsPage from '../pages/ResultsPage'

const AppRoutes = () => {
    return (
        <Routes>
            {/* Public Routes */}
            <Route path="/" element={<MainLayout />}>
                <Route index element={<LandingPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
            </Route>

            {/* Protected Routes */}
            <Route path="/dashboard" element={
                <PrivateRoute>
                    <DashboardLayout />
                </PrivateRoute>
            }>
                <Route index element={<DashboardPage />} />
                <Route path="analyze" element={<AnalysisPage />} />
                <Route path="results" element={<ResultsPage />} />
            </Route>
        </Routes>
    )
}

export default AppRoutes