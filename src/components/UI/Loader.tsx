import React from "react";
import styles from "./Loader.module.css";

const Loader: React.FC = () => {
    return (
        <h1 className={styles.loader}>Loading...</h1>
    );
};

export default Loader;
