import {DEFAULT_FEEDS_URL, PROXY_SERVER_URL} from "./DefaultUrls";

async function fetchUsers() {
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

async function fetchUserPost() {
    const userId = localStorage.getItem('userID');
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.ok) {
        const userData = await response.json();
        return userData.map(item => ({
            id: item.id,
            data: {
                title: item.title,
                body: item.body,
                userId: item.userId
            }
        }));
    }
}

async function fetchFeeds(url, index) {
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

async function addNewFeed(newFeedUrl) {
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

async function setDataStorage() {
    // if (!localStorage.getItem('feeds') || !localStorage.getItem('posts')) {
    Promise.all(DEFAULT_FEEDS_URL.map((url, index) => fetchFeeds(url, index)))
        .then((res) => {
            localStorage.setItem('feeds', JSON.stringify(res));
        })
        .catch(error => console.error('Error fetching feeds:', error));

    fetchUserPost().then(formattedData => {
        localStorage.setItem('posts', JSON.stringify(formattedData));
    });
    // }
}

export {fetchUsers, fetchFeeds, fetchUserPost, addNewFeed, setDataStorage}
