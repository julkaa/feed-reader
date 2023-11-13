import React, {ChangeEvent} from 'react';
import styles from "./Input.module.css"

interface IInputProps {
    type: string;
    id: string;
    label: string;
    placeholder: string;
    autofocus?: boolean;
    value: string; // Change to defaultValue if needed
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    className?: string;
}

const Input: React.FC<IInputProps> = ({type, id, label, placeholder, autofocus, value, onChange, className}) => {
    return (
        <>
            <label className={styles.label}>{label}</label>
            <input
                autoFocus={autofocus}
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`${styles.input} ${className}`}
            />
        </>
    );
};

export default Input;
