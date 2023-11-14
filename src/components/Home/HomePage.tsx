import React, {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import Header from "./Header";
import NewFeedForm from "../NewFeedForm/NewFeedForm";
import {addNewFeed, setDataStorage} from "../../shared/FetchApi";
import styles from "./HomePage.module.css";
import FeedBlock from "../Feeds/FeedBlock";
import Article from "../Feeds/Article";
import Loader from "../UI/Loader";
import UnderlineButton from "../UI/Button/UnderlineButton";

interface IFeedItem {
    id: number;
    data: any;
}

const HomePage: React.FC = () => {
    const [feedItems, setFeedItems] = useState<IFeedItem[]>(JSON.parse(localStorage.getItem('feeds') || '[]'));
    const [isLoading, setIsLoading] = useState(true);
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem('feeds', JSON.stringify(feedItems));
        setIsLoading(false);
    }, [feedItems]);

    if (isLoading) {
        return <Loader/>;
    }

    const viewFeed = (feedId: number) => {
        navigate(`/feed/${feedId}`);
    };

    const deleteFeed = (idToDelete: number) => {
        setFeedItems(prevFeedItems => prevFeedItems.filter(item => item.id !== idToDelete));
    };

    const resetData = () => {
        setIsLoading(true);
        setDataStorage().then(() => {
            const timer = setTimeout(() => {
                setIsLoading(false);
            }, 3000);
            navigate('/')
            return () => clearTimeout(timer);
        })
    };

    async function addFeed(newFeedUrl: string) {
        addNewFeed(newFeedUrl).then(res => {
            setFeedItems(prevFeedItems => [
                {id: 0, data: res},
                ...prevFeedItems.map(item => ({...item, id: item.id + 1}))
            ]);
        });
    }


    return (
        <>
            <Header/>
            <UnderlineButton value="Reset To Default Feed Data" onClick={resetData}
                             type='button' className={styles['reset-btn']}/>
            {id === undefined ? <div className={styles.wrapper}>
                    {feedItems.map((item) =>
                        <FeedBlock key={item.id} feed={item} onDeleteFeed={deleteFeed} onViewFeed={viewFeed}/>)}
                    <NewFeedForm onAddFeed={addFeed}/>
                </div> :
                <Article feed={feedItems.filter(item => item.id === Number(id))[0]}/>}


            {feedItems.length === 0 && <p>No Feed Data...</p>}
        </>

    );

}

export default HomePage;

