import React, {ReactNode} from 'react';
import './Card.css';

interface ICardProps {
    className?: string;
    children: ReactNode;
}

const Card: React.FC<ICardProps> = (props) => {
    const addedClass = props.className || '';
    const classes = 'card ' + addedClass;
    return (
        <div className={classes}>{props.children}</div>
    );
}

export default Card;
