import React from 'react'
import ReactMarkdown from 'react-markdown'
import markdownComponents from './markdownComponents'

const MarkdownContent = props => (
    <ReactMarkdown
        children={props.source}
        components={markdownComponents}
    />
)

export default MarkdownContent