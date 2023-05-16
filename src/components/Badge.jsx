const Badge = (props) => {
    return (
        <i onClick={props.onClick} className={`badge badge--${props.color} ${props.className}`}> </i>
    );
}

export default Badge;