import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Download, Share2, RefreshCw } from 'lucide-react'
import Button from '../components/ui/Button'
import Card, { CardHeader, CardTitle, CardDescription } from '../components/ui/Card'
import ProgressCircle from '../components/ui/ProgressCircle'
import SkillTags from '../components/analysis/SkillTags'
import SkillChart from '../components/analysis/SkillChart'
import SuggestionsCard from '../components/analysis/SuggestionsCard'

const ResultsPage = () => {
    const navigate = useNavigate()
    const [results, setResults] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Get results from localStorage (set by AnalysisPage)
        const storedResults = localStorage.getItem('analysisResults')

        if (storedResults) {
            try {
                setResults(JSON.parse(storedResults))
            } catch (error) {
                console.error('Error parsing results:', error)
            }
        }
        setIsLoading(false)
    }, [])

    // Dummy data for demo if no results
    const dummyResults = {
        matchPercentage: 72,
        matchedSkills: [
            'JavaScript', 'React', 'Node.js', 'Git', 'HTML/CSS',
            'REST APIs', 'Agile', 'Problem Solving', 'Redux', 'Express'
        ],
        missingSkills: [
            'TypeScript', 'Docker', 'AWS', 'GraphQL',
            'CI/CD', 'Kubernetes', 'Microservices', 'Jest'
        ],
        skillBreakdown: {
            programming: 85,
            frameworks: 70,
            tools: 60,
            softSkills: 90
        },
        suggestions: [
            'Consider learning TypeScript to strengthen your type-safe programming skills. Many companies now require it.',
            'Add Docker and containerization knowledge to your toolkit. This is increasingly important for deployment.',
            'Explore cloud platforms like AWS or Azure. Cloud skills are in high demand for modern development roles.',
            'Learn GraphQL as an alternative to REST APIs. It offers more flexibility in data fetching.',
            'Practice CI/CD pipeline setup using GitHub Actions or Jenkins. DevOps skills make you more valuable.'
        ],
        jobTitle: 'Senior Full Stack Developer',
        companyName: 'TechCorp Inc.'
    }

    const displayResults = results || dummyResults

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center space-x-4">
                    <Button
                        variant="ghost"
                        onClick={() => navigate('/dashboard')}
                        className="p-2"
                    >
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Analysis Results</h1>
                        <p className="text-gray-600">
                            {displayResults.jobTitle} at {displayResults.companyName}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button variant="secondary" size="sm">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                    </Button>
                    <Button variant="secondary" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Export PDF
                    </Button>
                    <Button to="/dashboard/analyze" variant="primary" size="sm">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        New Analysis
                    </Button>
                </div>
            </div>

            {/* Match Score */}
            <Card className="text-center py-8">
                <div className="flex justify-center mb-4">
                    <ProgressCircle percentage={displayResults.matchPercentage} size={160} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {displayResults.matchPercentage >= 80 ? 'Excellent Match!' :
                        displayResults.matchPercentage >= 60 ? 'Good Match' : 'Needs Improvement'}
                </h2>
                <p className="text-gray-600 max-w-md mx-auto">
                    {displayResults.matchPercentage >= 80
                        ? 'Your resume aligns well with this position. You have most of the required skills.'
                        : displayResults.matchPercentage >= 60
                            ? 'You have a solid foundation, but there are some key skills to develop.'
                            : 'There are significant gaps between your current skills and job requirements.'}
                </p>
            </Card>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-6">
                {/* Matched Skills */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-green-700">
                            <span className="h-2 w-2 bg-green-500 rounded-full mr-2"></span>
                            Matched Skills ({displayResults.matchedSkills.length})
                        </CardTitle>
                        <CardDescription>
                            Skills found in both your resume and job description
                        </CardDescription>
                    </CardHeader>
                    <SkillTags skills={displayResults.matchedSkills} type="matched" />
                </Card>

                {/* Missing Skills */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-red-700">
                            <span className="h-2 w-2 bg-red-500 rounded-full mr-2"></span>
                            Missing Skills ({displayResults.missingSkills.length})
                        </CardTitle>
                        <CardDescription>
                            Skills required by the job but not found in your resume
                        </CardDescription>
                    </CardHeader>
                    <SkillTags
                        skills={displayResults.missingSkills}
                        type="missing"
                        learningLinks={displayResults.learningLinks}
                    />
                </Card>
            </div>

            {/* Chart and Suggestions */}
            <div className="grid lg:grid-cols-2 gap-6">
                <SkillChart data={displayResults.skillBreakdown} />
                <SuggestionsCard suggestions={displayResults.suggestions} />
            </div>

            {/* Action Items */}
            <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 border-primary-100">
                <CardHeader>
                    <CardTitle>Recommended Next Steps</CardTitle>
                </CardHeader>
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-primary-600 font-bold">1</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Update Resume</h4>
                        <p className="text-sm text-gray-600">
                            Add relevant keywords and projects that demonstrate your matched skills
                        </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-primary-600 font-bold">2</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Learn Missing Skills</h4>
                        <p className="text-sm text-gray-600">
                            Focus on the top 3 missing skills that appear most frequently in job postings
                        </p>
                    </div>
                    <div className="p-4 bg-white rounded-lg shadow-sm">
                        <div className="h-8 w-8 bg-primary-100 rounded-lg flex items-center justify-center mb-3">
                            <span className="text-primary-600 font-bold">3</span>
                        </div>
                        <h4 className="font-semibold text-gray-900 mb-2">Apply Strategically</h4>
                        <p className="text-sm text-gray-600">
                            Target jobs where your match score is 70% or higher for better success rates
                        </p>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default ResultsPage