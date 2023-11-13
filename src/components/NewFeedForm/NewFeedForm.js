import React from "react";
import styles from "./NewFeedForm.module.css";
import {useState} from "react";
import Button from "../LoginForm/Button";
import Input from "../LoginForm/Input";

const NewFeedForm = ({onAddFeed}) => {
    const [newFeed, setNewFeed] = useState('https://www.aljazeera.com/xml/rss/all.xml');

    const handleAddingNewFeed = (event) => {
        event.preventDefault();

        if (newFeed !== '') {
            alert('New Feed is Added!');
            onAddFeed(newFeed);
        } else {
            alert('Please write correct url.');
        }
    };

    return (
        <div className={styles['new-feed-form']}>
            <p>Add New Feed Here</p>
            <form onSubmit={handleAddingNewFeed}>
                <Input
                    type="text"
                    id="title"
                    label="Title Of Feed"
                    placeholder="url"
                    autoFocus={true}
                    value="Al Jazeera"
                    onChange={(event) => setNewFeed(event.target.value)}
                />
                <Input
                    type="text"
                    id="url"
                    label="Url Of The Feed"
                    placeholder="url"
                    autoFocus={true}
                    value="https://www.aljazeera.com/xml/rss/all.xml"
                    onChange={(event) => setNewFeed(event.target.value)}
                />
                <Button className={styles['new-feed-btn']} type="submit" value="Submit"/>
            </form>
        </div>
    )
}


export default NewFeedForm;
