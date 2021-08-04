import { useContext } from 'react'
import Context from './Context'

export default function Text({ children }) {
    const ctx = useContext(Context)
    const text = ctx.translations && ctx.translations[children] ? ctx.translations[children] : children
    const parts = text.split(' ')
    const prefix = parts.slice(0, parts.length - 1).join(' ')
    const suffix = parts.slice(parts.length - 1, parts.length)
    return (
        <>
            {prefix}{' '}<span className="text-primary-500 bg-gradient-to-r from-primary-400 dark:from-primary-300 via-primary-500 to-primary-700 text-gradient">{suffix}</span>
        </>
    )
}