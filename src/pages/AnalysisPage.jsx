import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, FileText, Sparkles } from 'lucide-react'
import FileUpload from '../components/analysis/FileUpload'
import Button from '../components/ui/Button'
import Card from '../components/ui/Card'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import analysisService from '../services/analysisService'

const AnalysisPage = () => {
    const navigate = useNavigate()
    const [file, setFile] = useState(null)
    const [jobDescription, setJobDescription] = useState('')
    const [isAnalyzing, setIsAnalyzing] = useState(false)
    const [errors, setErrors] = useState({})

    const handleFileSelect = (selectedFile) => {
        setFile(selectedFile)
        if (errors.file) {
            setErrors({ ...errors, file: null })
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!file) {
            newErrors.file = 'Please upload your resume'
        }

        if (!jobDescription.trim()) {
            newErrors.jobDescription = 'Please paste a job description'
        } else if (jobDescription.length < 50) {
            newErrors.jobDescription = 'Job description is too short (min 50 characters)'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleAnalyze = async () => {
        if (!validateForm()) return

        setIsAnalyzing(true)

        try {
            // For testing without backend, use getDummyAnalysis()
            // const response = await analysisService.getDummyAnalysis()

            // For production with backend:
            const formData = new FormData()
            formData.append('resume', file)
            formData.append('jobDescription', jobDescription)
            const response = await analysisService.analyzeResume(formData)

            // Store results in localStorage or state management for results page
            localStorage.setItem('analysisResults', JSON.stringify(response.data))

            navigate('/dashboard/results')
        } catch (error) {
            console.error('Analysis failed:', error)
            setErrors({ ...errors, submit: 'Analysis failed. Please try again.' })
        } finally {
            setIsAnalyzing(false)
        }
    }

    return (
        <div className="max-w-4xl mx-auto animate-slide-up">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">New Analysis</h1>
                <p className="text-gray-600 mt-2">
                    Upload your resume and paste a job description to get started
                </p>
            </div>

            {errors.submit && (
                <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                    {errors.submit}
                </div>
            )}

            <div className="space-y-6">
                {/* File Upload Section */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Step 1: Upload Resume
                    </label>
                    <FileUpload onFileSelect={handleFileSelect} />
                    {errors.file && (
                        <p className="mt-2 text-sm text-red-600">{errors.file}</p>
                    )}
                </div>

                {/* Job Description Section */}
                <Card>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Step 2: Paste Job Description
                    </label>
                    <textarea
                        value={jobDescription}
                        onChange={(e) => {
                            setJobDescription(e.target.value)
                            if (errors.jobDescription) {
                                setErrors({ ...errors, jobDescription: null })
                            }
                        }}
                        placeholder="Paste the job description here..."
                        rows={8}
                        className={`w-full px-4 py-3 rounded-lg border resize-none transition-all duration-200 outline-none ${errors.jobDescription
                                ? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200'
                                : 'border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200'
                            }`}
                    />
                    <div className="flex justify-between mt-2">
                        <span className="text-sm text-gray-500">
                            {jobDescription.length} characters
                        </span>
                        {errors.jobDescription && (
                            <span className="text-sm text-red-600">{errors.jobDescription}</span>
                        )}
                    </div>
                </Card>

                {/* Analyze Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleAnalyze}
                        disabled={isAnalyzing}
                        className="w-full md:w-auto"
                    >
                        {isAnalyzing ? (
                            <>
                                <LoadingSpinner size="sm" className="mr-2 text-white" />
                                Analyzing...
                            </>
                        ) : (
                            <>
                                <Sparkles className="h-5 w-5 mr-2" />
                                Analyze Resume
                            </>
                        )}
                    </Button>
                </div>

                {/* Info Cards */}
                <div className="grid md:grid-cols-3 gap-4 mt-8">
                    <div className="flex items-start space-x-3 p-4 bg-blue-50 rounded-lg">
                        <FileText className="h-5 w-5 text-blue-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-gray-900">Supported Formats</h4>
                            <p className="text-sm text-gray-600">PDF and DOCX files up to 5MB</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-purple-50 rounded-lg">
                        <Sparkles className="h-5 w-5 text-purple-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-gray-900">AI-Powered</h4>
                            <p className="text-sm text-gray-600">Advanced NLP for accurate matching</p>
                        </div>
                    </div>
                    <div className="flex items-start space-x-3 p-4 bg-green-50 rounded-lg">
                        <Upload className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                            <h4 className="font-medium text-gray-900">Secure Upload</h4>
                            <p className="text-sm text-gray-600">Your data is encrypted and private</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AnalysisPage