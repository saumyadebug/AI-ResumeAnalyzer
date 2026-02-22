import { Link } from 'react-router-dom'
import {
    FileText,
    Clock,
    TrendingUp,
    Plus,
    CheckCircle2,
    AlertCircle
} from 'lucide-react'
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '../components/ui/Card'
import Button from '../components/ui/Button'

const DashboardPage = () => {
    // Mock recent analyses - in real app, fetch from API
    const recentAnalyses = [
        {
            id: 1,
            jobTitle: 'Senior Frontend Developer',
            company: 'TechCorp Inc.',
            matchScore: 85,
            date: '2024-01-15',
            status: 'completed'
        },
        {
            id: 2,
            jobTitle: 'Full Stack Engineer',
            company: 'StartupXYZ',
            matchScore: 62,
            date: '2024-01-14',
            status: 'completed'
        }
    ]

    const stats = [
        { label: 'Total Analyses', value: '12', icon: FileText, color: 'blue' },
        { label: 'Avg. Match Score', value: '74%', icon: TrendingUp, color: 'green' },
        { label: 'Skills Identified', value: '48', icon: CheckCircle2, color: 'purple' },
    ]

    return (
        <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600 mt-1">Welcome back! Here's your skill gap overview.</p>
                </div>
                <Button to="/dashboard/analyze" variant="primary">
                    <Plus className="h-5 w-5 mr-2" />
                    New Analysis
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <Card key={index} className="card-hover">
                        <CardContent className="flex items-center space-x-4">
                            <div className={`h-12 w-12 rounded-xl bg-${stat.color}-100 flex items-center justify-center`}>
                                <stat.icon className={`h-6 w-6 text-${stat.color}-600`} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Recent Analyses */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Recent Analyses</CardTitle>
                            <CardDescription>Your latest resume analyses</CardDescription>
                        </div>
                        <Button to="/dashboard/results" variant="ghost">
                            View All
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    {recentAnalyses.length > 0 ? (
                        <div className="space-y-4">
                            {recentAnalyses.map((analysis) => (
                                <div
                                    key={analysis.id}
                                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                >
                                    <div className="flex items-center space-x-4">
                                        <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center">
                                            <FileText className="h-5 w-5 text-primary-600" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-gray-900">{analysis.jobTitle}</h4>
                                            <p className="text-sm text-gray-500">{analysis.company}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-6">
                                        <div className="text-right">
                                            <div className={`text-lg font-bold ${analysis.matchScore >= 80 ? 'text-green-600' :
                                                    analysis.matchScore >= 60 ? 'text-yellow-600' : 'text-red-600'
                                                }`}>
                                                {analysis.matchScore}%
                                            </div>
                                            <div className="text-xs text-gray-500">Match Score</div>
                                        </div>
                                        <div className="text-right hidden sm:block">
                                            <div className="text-sm text-gray-900">{analysis.date}</div>
                                            <div className="text-xs text-gray-500">Analyzed</div>
                                        </div>
                                        <Button to="/dashboard/results" variant="secondary" size="sm">
                                            View
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <FileText className="h-8 w-8 text-gray-400" />
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No analyses yet</h3>
                            <p className="text-gray-500 mb-4">Upload your first resume to get started</p>
                            <Button to="/dashboard/analyze" variant="primary">
                                Start Analysis
                            </Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Quick Tips */}
            <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
                    <CardContent className="flex items-start space-x-4">
                        <div className="h-10 w-10 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-primary-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Pro Tip</h4>
                            <p className="text-sm text-gray-600">
                                Tailor your resume for each job application. Our AI can help you identify
                                exactly which keywords to add for better ATS compatibility.
                            </p>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
                    <CardContent className="flex items-start space-x-4">
                        <div className="h-10 w-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                            <TrendingUp className="h-5 w-5 text-green-600" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-900 mb-1">Improvement Tracker</h4>
                            <p className="text-sm text-gray-600">
                                Your average match score has improved by 15% over the last month.
                                Keep updating your skills!
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}

export default DashboardPage