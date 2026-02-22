export const APP_NAME = 'AI Resume Skill Gap Analyzer'
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard',
    ANALYZE: '/dashboard/analyze',
    RESULTS: '/dashboard/results'
}

export const SKILL_CATEGORIES = {
    PROGRAMMING: 'programming',
    FRAMEWORKS: 'frameworks',
    TOOLS: 'tools',
    SOFT_SKILLS: 'softSkills'
}