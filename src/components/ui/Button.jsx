import React from 'react';
import { motion } from 'framer-motion';
import { FaSpinner } from 'react-icons/fa';

const Button = ({
    children,
    onClick,
    type = 'button',
    variant = 'primary',
    className = '',
    loading = false,
    disabled = false,
    href = null,
    target = '_self',
    rel = '',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-3 rounded-full font-bold text-lg transition-all hover:scale-105 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900";
    
    const variants = {
        primary: "bg-primary hover:bg-secondary text-white shadow-lg shadow-primary/30 focus:ring-primary",
        outline: "bg-transparent border-2 border-slate-700 text-white hover:bg-slate-800 focus:ring-slate-500",
        danger: "bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-600/30 focus:ring-red-500",
        secondary: "bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 focus:ring-slate-500"
    };

    const classes = `${baseStyles} ${variants[variant] || variants.primary} ${className}`;

    const content = (
        <>
            {loading && <FaSpinner className="animate-spin mr-2" />}
            {children}
        </>
    );

    if (href) {
        return (
            <motion.a
                href={href}
                target={target}
                rel={rel}
                className={classes}
                whileTap={{ scale: 0.95 }}
                {...props}
            >
                {content}
            </motion.a>
        );
    }

    return (
        <motion.button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={classes}
            whileTap={{ scale: 0.95 }}
            {...props}
        >
            {content}
        </motion.button>
    );
};

export default Button;
