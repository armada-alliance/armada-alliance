export default function Image(props) {

    return (
        <img
            {...props}
            src={`https://armada-alliance.com/assets${props.src}`}
        />
    )
}