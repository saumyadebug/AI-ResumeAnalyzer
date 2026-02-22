import { Lightbulb, ArrowRight } from 'lucide-react'
import Card, { CardHeader, CardTitle, CardContent } from '../ui/Card'

const SuggestionsCard = ({ suggestions }) => {
    return (
        <Card className="bg-gradient-to-br from-primary-50 to-secondary-50 border-primary-100">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-primary-100 rounded-lg">
                        <Lightbulb className="h-5 w-5 text-primary-600" />
                    </div>
                    <CardTitle>AI Recommendations</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <ul className="space-y-4">
                    {suggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start space-x-3">
                            <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary-600 text-white flex items-center justify-center text-sm font-semibold mt-0.5">
                                {index + 1}
                            </div>
                            <div className="flex-1">
                                <p className="text-gray-700 leading-relaxed">{suggestion}</p>
                            </div>
                            <ArrowRight className="h-5 w-5 text-primary-400 flex-shrink-0 mt-0.5" />
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    )
}

export default SuggestionsCard