import {useEffect, useState} from "react";
import Header from "./Header";
import Feed from "../Feeds/Feed";
import {useNavigate, useParams} from "react-router-dom";
import NewFeedForm from "../NewFeedForm/NewFeedForm";
import {addNewFeed} from "../../shared/FetchApi";
import styles from "./HomePage.module.css"

const HomePage = () => {
    const [feedItems, setFeedItems] = useState(JSON.parse(localStorage.getItem('feeds')));
    const [postItems, setPostItems] = useState(JSON.parse(localStorage.getItem('posts')));
    const [isLoading, setIsLoading] = useState(true);
    const [typeOfFeed, setTypeOfFeed] = useState('');
    const id = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        localStorage.setItem('feeds', JSON.stringify(feedItems));
        localStorage.setItem('posts', JSON.stringify(postItems));
        setIsLoading(false);
    }, [feedItems, postItems]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    const viewFeed = (id, typeFeed) => {
        setTypeOfFeed(typeFeed);
        navigate(`/feed/${id}`);
    };

    const deleteFeed = (idToDelete, typeFeed) => {
        if (typeFeed === 'feeds') {
            setFeedItems(prevFeedItems => prevFeedItems.filter(item => item.id !== idToDelete));
        } else {
            setPostItems(prevPostItems => prevPostItems.filter(item => item.id !== idToDelete));
        }

    };

    async function addFeed(newFeedUrl) {
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
            {id.id === undefined ? (<>{feedItems.length > 0 ? (
                <>
                    <p className={styles.title}>Feeds</p>
                    {feedItems.map((item) => (
                        <Feed
                            key={item.id}
                            feedData={item.data}
                            feedID={item.id}
                            onDeleteFeed={deleteFeed}
                            onViewFeed={viewFeed}
                        />
                    ))}
                    <p className={styles.title}>Posts</p>
                    {postItems.map((item) => (
                        <Feed
                            key={item.id}
                            feedData={item.data}
                            feedID={item.id}
                            onDeleteFeed={deleteFeed}
                            onViewFeed={viewFeed}
                        />
                    ))}
                </>
            ) : (
                feedItems.length === 0 && postItems.length === 0 && (
                    <p>There's No Feed Data...</p>
                )
            )}</>) : (<>
                {typeOfFeed === 'feeds' && <Feed feedData={feedItems.filter(item => item.id === Number(id.id))[0].data}
                                                 onDeleteFeed={deleteFeed}
                                                 feedID={Number(id.id)}
                                                 onViewFeed={viewFeed}/>}
                {typeOfFeed === 'posts' && <Feed feedData={postItems.filter(item => item.id === Number(id.id))[0].data}
                                                 onDeleteFeed={deleteFeed}
                                                 feedID={Number(id.id)}
                                                 onViewFeed={viewFeed}/>}
            </>)}


            {feedItems.length > 0 && (
                <NewFeedForm onAddFeed={addFeed}/>
            )}
        </>

    );

}

export default HomePage;
