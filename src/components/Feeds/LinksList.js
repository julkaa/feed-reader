import React from "react";
import styles from "./LinksList.module.css";
import Card from "../UI/Card";

const LinksList = ({links}) => {

    return (
        <div className={styles['links-wrapper']}>
            {links.map((item) =>
                <Card className={styles['link-block']}>
                    <a className={styles.link} href={item.link} target="_blank"
                       rel="noopener noreferrer">{item.title}</a>

                </Card>
            )}</div>
    )
}

export default LinksList;
