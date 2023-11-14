import React, {FC} from 'react';
import styles from './Article.module.css';
import LinksList from './LinksList';

interface IFeedItem {
    title: string;
    description?: string;
    body?: string;
}

interface IFeedData {
    title: string;
    description: string;
    body: string;
    items: IFeedItem[];
}

interface IArticleProps {
    feed: {
        data: IFeedData;
    };
}

const Article: FC<IArticleProps> = ({feed}) => {
    const linkPresent: boolean = feed?.data?.items?.length > 0;
    const articleContainerStyles: React.CSSProperties = {
        minHeight: feed?.data?.items?.length > 0 ? '' : '90vh',
    };
    return (
        <div>
            <div className={styles['article-container']} style={articleContainerStyles}>
                <div className={styles.article}>
                    <h1 className="article-title">{feed.data.title}</h1>
                    <p className={styles['article-description']}>
                        {feed.data.description}
                        {feed.data.body}
                    </p>
                    <div className={styles['link-description']}>
                        {linkPresent ? `To see more feed's articles, click on the link below!` : 'There are no links. Sorry :('}
                    </div>
                </div>
            </div>
            {linkPresent && <LinksList dataLinks={feed.data.items}/>}
        </div>
    );
};

export default Article;
