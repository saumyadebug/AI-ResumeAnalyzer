import { CheckCircle2, XCircle } from 'lucide-react'

const SkillTags = ({ skills, type = 'matched', learningLinks = {} }) => {
    const isMatched = type === 'matched'

    return (
        <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => {
                const searchLink = isMatched
                    ? null
                    : `https://www.youtube.com/results?search_query=${encodeURIComponent(learningLinks[skill] || `learn ${skill} full course`)}`;

                const content = (
                    <span
                        key={index}
                        className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 cursor-default ${isMatched
                            ? 'bg-green-100 text-green-800 border border-green-200'
                            : 'bg-red-100 text-red-800 border border-red-200 hover:bg-red-200 hover:scale-105 cursor-pointer'
                            }`}
                    >
                        {isMatched ? (
                            <CheckCircle2 className="h-4 w-4 mr-1.5" />
                        ) : (
                            <XCircle className="h-4 w-4 mr-1.5" />
                        )}
                        {skill}
                        {!isMatched && (
                            <span className="ml-1.5 text-[10px] bg-red-800 text-white px-1.5 py-0.5 rounded uppercase tracking-wider">Learn</span>
                        )}
                    </span>
                );

                if (!isMatched) {
                    return (
                        <a
                            key={index}
                            href={searchLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="no-underline"
                            title={`Search YouTube for ${skill} tutorials`}
                        >
                            {content}
                        </a>
                    );
                }

                return content;
            })}
        </div>
    )
}

export default SkillTags