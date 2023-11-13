import React from "react";
import Card from "../UI/Card";
import styles from "./Feed.module.css";
import Button from "../LoginForm/Button";
import {useNavigate, useParams} from "react-router-dom";

const Feed = ({feedData, onDeleteFeed, onViewFeed, feedID}) => {
    const id = useParams();

    const deleteFeed = () => {
        const type = feedData.userId !== undefined ? 'posts' : 'feeds';
        onDeleteFeed(feedID, type);
    };

    const viewFeed = () => {
        const type = feedData.userId !== undefined ? 'posts' : 'feeds';
        onViewFeed(feedID, type);
    };
    return (
        <Card className={styles.column}>
            <Card>
                <a className={styles.title} href="" target="_blank"
                   rel="noopener noreferrer">{feedData.title}</a>
                {id.id === undefined && <div>
                    <Button value="View" onClick={viewFeed} className={styles['view-btn']}/>
                    <Button value="Delete" onClick={deleteFeed} className={styles['delete-btn']}/>
                </div>}
            </Card>
            <div>
                {id && id.id === undefined ? (
                    <span>{feedData.description}<span>{feedData.body}</span></span>
                ) : (
                    <>
                        {feedData.items ? (
                            <ul>
                                {feedData.items.map((item, index) => (
                                    <li key={index}>
                                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <span>{feedData.body}</span>
                        )}
                    </>
                )}


            </div>
        </Card>
    )
}

export default Feed;
