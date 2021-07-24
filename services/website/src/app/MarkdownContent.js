import React from 'react'
import ReactMarkdown from 'react-markdown'
import markdownComponents from './markdownComponents'

const MarkdownContent = ({ source, spacingEnabled = true }) => (
    <ReactMarkdown
        children={source}
        components={markdownComponents({ spacingEnabled })}
    />
)

export default MarkdownContent