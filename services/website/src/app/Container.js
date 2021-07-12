export default function Container(props) {

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 lg:py-24">
            {props.children}
        </div>
    )
}