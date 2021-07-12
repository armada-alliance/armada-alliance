import React from 'react'
import ReactMarkdown from 'react-markdown'

const Markdown = props => (
    <ReactMarkdown
        {...props}
        components={{
            a: (props) => (
                <a {...props} className="font-bold underline" />
            )
        }}
    />
)

export default Markdown