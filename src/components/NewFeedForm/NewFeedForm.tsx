import React, {useState, ChangeEvent, FormEvent} from "react";
import styles from "./NewFeedForm.module.css";
import Button from "../LoginForm/Button";
import Input from "../LoginForm/Input";

interface NewFeedFormProps {
    onAddFeed: (newFeed: string) => void;
}

const NewFeedForm: React.FC<NewFeedFormProps> = ({onAddFeed}) => {
    const [newFeed, setNewFeed] = useState<string>('https://www.aljazeera.com/xml/rss/all.xml');

    const handleAddingNewFeed = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (newFeed !== '') {
            alert('New Feed is Added!');
            onAddFeed(newFeed);
        } else {
            alert('Please write correct url.');
        }
    };

    const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewFeed(event.target.value);
    };

    const handleUrlChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewFeed(event.target.value);
    };

    return (
        <div className={styles['new-feed-form']}>
            <p>Add New Feed Here</p>
            <form onSubmit={handleAddingNewFeed}>
                <Input
                    type="text"
                    id="title"
                    name="title"
                    label="Title Of Feed"
                    placeholder="url"
                    value={newFeed}
                    onChange={handleTitleChange}
                />
                <Input
                    type="text"
                    id="url"
                    name="url"
                    label="Url Of The Feed"
                    placeholder="url"
                    value={newFeed}
                    onChange={handleUrlChange}
                />
                <Button className={styles['new-feed-btn']} type="submit" value="Submit"/>
            </form>
        </div>
    );
};

export default NewFeedForm;
