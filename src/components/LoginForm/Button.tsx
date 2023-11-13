import React from 'react';
import styles from './Button.module.css';

interface IButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: () => void;
    value: string;
    className?: string;
}

const Button: React.FC<IButtonProps> = ({type = "button", onClick, value, className = ""}) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            type={type}
            onClick={onClick}
        >
            {value}
        </button>
    );
};

export default Button;
