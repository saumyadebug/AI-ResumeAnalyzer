import { Link } from 'react-router-dom'

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    to,
    href,
    className = '',
    ...props
}) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-gradient-to-r from-primary-600 to-secondary-600 text-white hover:shadow-lg hover:-translate-y-0.5 focus:ring-primary-500',
        secondary: 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-200',
        outline: 'bg-transparent border-2 border-primary-600 text-primary-600 hover:bg-primary-50 focus:ring-primary-500',
        ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900',
        danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500'
    }

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    if (to) {
        return (
            <Link to={to} className={classes} {...props}>
                {children}
            </Link>
        )
    }

    if (href) {
        return (
            <a href={href} className={classes} {...props}>
                {children}
            </a>
        )
    }

    return (
        <button className={classes} {...props}>
            {children}
        </button>
    )
}

export default Button