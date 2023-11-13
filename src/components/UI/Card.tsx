import './Card.css'

const Card = (props: any) => {
    const addedClass = props.className || '';
    const classes = 'card ' + addedClass;
    return (
        <div className={classes}>{props.children}</div>
    )
}


export default Card;
