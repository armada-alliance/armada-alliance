import Link from 'next/link'
import { useContext } from 'react'
import Context from './Context'

export default function WrappedLink(props) {

    const ctx = useContext(Context)

    let nextProps = props

    if (props.internal) {

        const page = ctx.pages.find(page => page.origin === props.href && page.language === ctx.language)

        nextProps = {
            ...nextProps,
            href: page ? page.slug : '/404'
        }
    }

    return (
        <Link {...nextProps}>{props.children}</Link>
    )
}