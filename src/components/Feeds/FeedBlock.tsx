import styles from "./FeedBlock.module.css";
import React from "react";
import Button from "../UI/Button/Button";

interface IFeed {
    id: string | number;
    data: {
        title: string
    }
}

interface IFeedBlockProps {
    feed: IFeed;
    onDeleteFeed: (id: string | number) => void;
    onViewFeed: (id: string | number) => void;
}

const FeedBlock: React.FC<IFeedBlockProps> = ({feed, onDeleteFeed, onViewFeed}) => {
    const deleteFeed = () => {
        onDeleteFeed(Number(feed.id));
    };

    const viewFeed = () => {
        onViewFeed(feed.id); // feed.id is already a string
    };

    return (
        <div key={feed.id} className={styles['feed-wrapper']}>
            <h3 className={styles['feed-title']}>{feed.data.title}</h3>
            <div className={styles.buttons}>
                <Button onClick={viewFeed} value='View'/>
                <Button className={styles['delete-button']} onClick={deleteFeed} value='Delete'/>
            </div>
        </div>
    );
};

export default FeedBlock;
