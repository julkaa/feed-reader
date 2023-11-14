import React from "react";
import styles from "./LinksList.module.css";
import Card from "../UI/Card";

export interface IFeedItem {
    title: string;
    link?: string;
}

interface ILinksListProps {
    dataLinks: IFeedItem[];
}

const LinksList: React.FC<ILinksListProps> = ({dataLinks}) => {
    return (
        <div className={styles['links-wrapper']}>
            {dataLinks.map((item, index) => (
                <Card key={index} className={styles['link-block']}>
                    <a className={styles.link} href={item.link} target="_blank" rel="noopener noreferrer">
                        {item.title}
                    </a>
                </Card>
            ))}
        </div>
    );
};

export default LinksList;
