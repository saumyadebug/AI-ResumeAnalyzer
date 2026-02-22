import { Link } from 'react-router-dom'
import {
    Upload,
    Brain,
    BarChart3,
    Zap,
    Shield,
    Clock,
    CheckCircle2,
    ArrowRight
} from 'lucide-react'
import Button from '../components/ui/Button'

const LandingPage = () => {
    const features = [
        {
            icon: Upload,
            title: 'Easy Upload',
            description: 'Simply upload your resume in PDF or DOCX format. Our system supports all standard resume formats.'
        },
        {
            icon: Brain,
            title: 'AI-Powered Analysis',
            description: 'Advanced AI algorithms analyze your skills against job requirements with high accuracy.'
        },
        {
            icon: BarChart3,
            title: 'Detailed Insights',
            description: 'Get comprehensive skill gap analysis with visual charts and actionable recommendations.'
        },
        {
            icon: Zap,
            title: 'Instant Results',
            description: 'Receive your analysis in seconds, not hours. Make data-driven decisions quickly.'
        },
        {
            icon: Shield,
            title: 'Secure & Private',
            description: 'Your data is encrypted and never shared. We prioritize your privacy and security.'
        },
        {
            icon: Clock,
            title: 'Save Time',
            description: 'Stop guessing what employers want. Know exactly which skills to develop.'
        }
    ]

    const steps = [
        {
            number: '01',
            title: 'Upload Resume',
            description: 'Upload your current resume in PDF or DOCX format'
        },
        {
            number: '02',
            title: 'Paste Job Description',
            description: 'Copy and paste the job description you want to analyze against'
        },
        {
            number: '03',
            title: 'Get AI Analysis',
            description: 'Our AI analyzes the match and identifies skill gaps instantly'
        }
    ]

    return (
        <div className="pt-16">
            {/* Hero Section */}
            <section className="relative overflow-hidden gradient-bg min-h-[90vh] flex items-center">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="animate-slide-up">
                            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-100 text-primary-700 font-semibold text-sm mb-6">
                                <Zap className="h-4 w-4 mr-2" />
                                AI-Powered Career Tool
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                                Close Your{' '}
                                <span className="gradient-text">Skill Gap</span>
                                {' '}& Land Your Dream Job
                            </h1>
                            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                                Upload your resume, paste any job description, and get instant AI-powered
                                analysis showing exactly what skills you need to succeed.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Button to="/register" size="lg">
                                    Start Free Analysis
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button to="/login" variant="secondary" size="lg">
                                    Sign In
                                </Button>
                            </div>
                            <div className="mt-8 flex items-center space-x-6 text-sm text-gray-500">
                                <div className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                    No credit card required
                                </div>
                                <div className="flex items-center">
                                    <CheckCircle2 className="h-5 w-5 text-green-500 mr-2" />
                                    Free for basic use
                                </div>
                            </div>
                        </div>

                        <div className="hidden lg:block relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-secondary-400 rounded-3xl transform rotate-3 opacity-20 blur-2xl"></div>
                            <div className="relative bg-white rounded-2xl shadow-2xl p-8 animate-fade-in">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex space-x-2">
                                        <div className="h-3 w-3 rounded-full bg-red-400"></div>
                                        <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
                                        <div className="h-3 w-3 rounded-full bg-green-400"></div>
                                    </div>
                                    <span className="text-sm text-gray-400">Analysis Report</span>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 bg-green-100 rounded-full flex items-center justify-center">
                                                <CheckCircle2 className="h-6 w-6 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Skills Matched</p>
                                                <p className="text-sm text-gray-600">8 skills aligned</p>
                                            </div>
                                        </div>
                                        <span className="text-2xl font-bold text-green-600">85%</span>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                                        <div className="flex items-center space-x-3">
                                            <div className="h-10 w-10 bg-red-100 rounded-full flex items-center justify-center">
                                                <Zap className="h-6 w-6 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">Missing Skills</p>
                                                <p className="text-sm text-gray-600">3 gaps identified</p>
                                            </div>
                                        </div>
                                        <span className="text-2xl font-bold text-red-600">15%</span>
                                    </div>

                                    <div className="h-32 bg-gray-50 rounded-lg flex items-end justify-around p-4">
                                        {[40, 70, 55, 85, 60].map((height, i) => (
                                            <div
                                                key={i}
                                                className="w-8 bg-gradient-to-t from-primary-500 to-secondary-500 rounded-t"
                                                style={{ height: `${height}%` }}
                                            ></div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-lg text-gray-600">
                            Powerful features designed to help you understand and improve your
                            professional skill set.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="group p-6 rounded-2xl bg-white border border-gray-200 card-hover"
                            >
                                <div className="h-12 w-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                                    <feature.icon className="h-6 w-6 text-white" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section id="how-it-works" className="py-24 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">
                            How It Works
                        </h2>
                        <p className="text-lg text-gray-600">
                            Three simple steps to get your personalized skill gap analysis
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {steps.map((step, index) => (
                            <div key={index} className="relative">
                                <div className="text-6xl font-bold text-gray-200 absolute -top-4 -left-2">
                                    {step.number}
                                </div>
                                <div className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                        {step.title}
                                    </h3>
                                    <p className="text-gray-600">
                                        {step.description}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                                        <ArrowRight className="h-8 w-8 text-gray-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-gradient-to-r from-primary-600 to-secondary-600">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                        Ready to Analyze Your Resume?
                    </h2>
                    <p className="text-xl text-primary-100 mb-8">
                        Join thousands of job seekers who have improved their chances of landing
                        their dream job.
                    </p>
                    <Button to="/register" variant="secondary" size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                        Get Started for Free
                    </Button>
                </div>
            </section>
        </div>
    )
}

export default LandingPage
