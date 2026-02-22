import api from './api'

const analysisService = {
    analyzeResume: (formData) => {
        return api.post('/analyze', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
    },

    // Dummy data for testing UI without backend
    getDummyAnalysis: () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    data: {
                        matchPercentage: 72,
                        matchedSkills: [
                            'JavaScript', 'React', 'Node.js', 'Git', 'HTML/CSS',
                            'REST APIs', 'Agile', 'Problem Solving'
                        ],
                        missingSkills: [
                            'TypeScript', 'Docker', 'AWS', 'GraphQL',
                            'CI/CD', 'Kubernetes', 'Microservices'
                        ],
                        skillBreakdown: {
                            programming: 85,
                            frameworks: 70,
                            tools: 60,
                            softSkills: 90
                        },
                        suggestions: [
                            'Consider learning TypeScript to strengthen your type-safe programming skills',
                            'Add Docker and containerization knowledge to your toolkit',
                            'Explore cloud platforms like AWS or Azure for deployment expertise',
                            'Learn GraphQL as an alternative to REST APIs',
                            'Practice CI/CD pipeline setup using GitHub Actions or Jenkins'
                        ],
                        jobTitle: 'Senior Full Stack Developer',
                        companyName: 'TechCorp Inc.'
                    }
                })
            }, 2000) // Simulate 2 second delay
        })
    }
}

export default analysisService