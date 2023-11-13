import React, {useState, ChangeEvent, FormEvent} from "react";
import styles from "./NewFeedForm.module.css";
import Button from "../UI/Button";
import Input from "../UI/Input";
import FormBlock from "../UI/FormBlock";

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
        <FormBlock onSubmit={handleAddingNewFeed}
                   onChangeFirst={{name: 'title', label: 'Title Of Feed', value: 'Al Jazeera – Breaking News, World News and Video from Al Jazeera', onClick: handleTitleChange}}
                   onChangeSecond={{name: 'url', label: 'Url Of The Feed', value: newFeed, onClick: handleUrlChange}}
                   title='Add New Feed Here' className={styles['new-feed-form']}/>
    );
};

export default NewFeedForm;
