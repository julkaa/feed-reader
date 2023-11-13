import styles from "./Button.module.css"

const Button = ({type, onClick, value, className, id}) => {
    return (
        <button
            className={`${styles.button} ${className}`}
            type={type}
            id={id}
            onClick={onClick}>
            {value}
        </button>
    );
};


export default Button;
