const Card = ({ children, className = '', padding = 'normal', shadow = 'md' }) => {
    const paddings = {
        none: '',
        small: 'p-4',
        normal: 'p-6',
        large: 'p-8'
    }

    const shadows = {
        none: '',
        sm: 'shadow-sm',
        md: 'shadow-md',
        lg: 'shadow-lg',
        xl: 'shadow-xl'
    }

    return (
        <div className={`bg-white rounded-xl border border-gray-200 ${paddings[padding]} ${shadows[shadow]} ${className}`}>
            {children}
        </div>
    )
}

export const CardHeader = ({ children, className = '' }) => (
    <div className={`mb-4 ${className}`}>
        {children}
    </div>
)

export const CardTitle = ({ children, className = '' }) => (
    <h3 className={`text-xl font-bold text-gray-900 ${className}`}>
        {children}
    </h3>
)

export const CardDescription = ({ children, className = '' }) => (
    <p className={`mt-1 text-gray-600 ${className}`}>
        {children}
    </p>
)

export const CardContent = ({ children, className = '' }) => (
    <div className={className}>
        {children}
    </div>
)

export const CardFooter = ({ children, className = '' }) => (
    <div className={`mt-6 pt-6 border-t border-gray-100 ${className}`}>
        {children}
    </div>
)

export default Card