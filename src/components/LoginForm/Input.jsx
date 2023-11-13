import React from 'react';
import styles from "./Input.module.css"

const Input = ({type, id, name, label, placeholder, autofocus, value, onChange, className}) => {
    return (
        <>
            <label className={styles.label}>{label}</label>
            <input
                autoFocus={autofocus}
                type={type}
                id={id}
                name={name}
                placeholder={placeholder}
                value={value} // Change 'value' to 'defaultValue' if needed
                onChange={onChange} // Add onChange handler
                className={`${styles.input} ${className}`}
            />
        </>
    );
};

export default Input;
