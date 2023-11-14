// LinksList.tsx

import React from "react";
import styles from "./LinksList.module.css";
import Card from "../UI/Card";

interface ILink {
    title: string;
    link: string;
    // ...other properties specific to ILink
}

export interface IFeedItem {
    title: string;
    description?: string;
    body?: string;
    // ...other properties
}

interface ILinksListProps {
    dataLinks: IFeedItem[];
}

const LinksList: React.FC<ILinksListProps> = ({dataLinks}) => {
    const convertToLink = (feedItem: IFeedItem): ILink => {
        return {
            title: feedItem.title,
            link: feedItem.description || '', // Assuming 'description' property is used as 'link'
            // Add other properties if required for ILink
        };
    };

    const links: ILink[] = dataLinks.map(convertToLink);

    return (
        <div className={styles['links-wrapper']}>
            {links.map((item, index) => (
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
