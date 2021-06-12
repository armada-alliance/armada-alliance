import React from 'react'
import { css } from '@emotion/react'
import ReactMarkdown from 'react-markdown'

const Markdown = props => (
    <ReactMarkdown
        {...props}
        components={{
            a: (props) => (
                <a {...props} className="font-bold underline" />
            ),
            list: ({ children }) => (
                <ul css={css`padding-left: 18px;`}>{children}</ul>
            )
        }}
    />
)

export default Markdown