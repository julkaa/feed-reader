import React, {FC, MouseEventHandler} from 'react';
import styles from './UnderlineButton.module.css';

interface IUnderlineButtonProps {
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    value: string;
    className?: string;
}

const UnderlineButton: FC<IUnderlineButtonProps> = ({type = "button", onClick, value, className = ""}) => {
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

export default UnderlineButton;
