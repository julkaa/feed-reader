import {DEFAULT_FEEDS_URL, PROXY_SERVER_URL} from "./DefaultUrls";

interface Post {
    id: number;
    data: {
        title: string;
        body: string;
        userId: number;
    };
}

async function fetchUsers(): Promise<any> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Error during login:', error);
    }
}

async function fetchUserPost(): Promise<Post[] | undefined> {
    const userId = localStorage.getItem('userID');
    if (userId) {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const userData = await response.json();
            return userData.map((item: any) => ({
                id: item.id,
                data: {
                    title: item.title,
                    body: item.body,
                    userId: item.userId,
                },
            }));
        }
    }
}

async function fetchFeeds(url: string, index: number): Promise<{ id: number; data: any } | undefined> {
    try {
        const response = await fetch(PROXY_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: url}), // URL to be fetched
        });
        const data = await response.json();
        return {id: index, data: data};
    } catch (error) {
        console.error('Error fetching the feed:', error);
    }
}

async function addNewFeed(newFeedUrl: string): Promise<any> {
    try {
        const response = await fetch(PROXY_SERVER_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({url: newFeedUrl}), // URL to be added
        });

        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.error('Error adding the feed:', error);
    }
}

async function setDataStorage(): Promise<void> {
    // if (!localStorage.getItem('feeds') || !localStorage.getItem('posts')) {
    Promise.all(DEFAULT_FEEDS_URL.map((url, index) => fetchFeeds(url, index)))
        .then((res) => {
            localStorage.setItem('feeds', JSON.stringify(res));
        })
        .catch((error) => console.error('Error fetching feeds:', error));

    fetchUserPost().then((formattedData) => {
        if (formattedData) {
            localStorage.setItem('posts', JSON.stringify(formattedData));
        }
    });
    // }
}

export {fetchUsers, fetchFeeds, fetchUserPost, addNewFeed, setDataStorage};