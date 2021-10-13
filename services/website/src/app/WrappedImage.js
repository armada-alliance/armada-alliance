import { useState, useEffect } from "react"
// import Image from "next/image"
import cx from "classnames"

export default function WrappedImage(props) {

    // console.log('props', props)

    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (loaded) return
        const img = new Image(props.src)
        img.onLoad = () => setLoaded(true)
    }, [loaded])

    return (
        <img
            className={cx(
                props.className,
                "duration-500 transition-opacity",
                loaded ? "opacity-100" : "opacity-0"
            )}
            style={{ backgroundImage: `url('${props.src}')` }}
            onLoad={() =>
                setLoaded(true)
            }
        />
    )
}