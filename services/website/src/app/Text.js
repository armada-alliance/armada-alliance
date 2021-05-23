import { useContext } from 'react'
import Context from './Context'

export default function Text({ children }) {
    const ctx = useContext(Context)
    return (
        <>
            {ctx.translations && ctx.translations[children] ? ctx.translations[children] : children}
        </>
    )
}