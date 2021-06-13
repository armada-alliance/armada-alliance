import React from 'react'
import { css } from '@emotion/react'
import ReactMarkdown from 'react-markdown'
import PageTooltip from './PageTooltip'

const MarkdownContent = props => (
    <ReactMarkdown
        {...props}
        components={{
            a: (props) => (
                <PageTooltip slug={props.href}>
                    <a {...props} className="text-gray-900 font-bold underline" />
                </PageTooltip>
            ),
            h1: props => <h2 {...props} className="block text-2xl sm:text-3xl leading-8 font-bold text-gray-900 mb-3 mt-6">H1 should not be used, use H2 instead</h2>,
            h2: props => <h2 {...props} className="block text-2xl sm:text-3xl leading-8 font-bold text-gray-900 mb-3 mt-6" />,
            ul: props => <ul {...props} className="my-8" />,
            strong: props => <strong {...props} className="font-bold text-gray-900" />,
            li: props => <li
                {...props}
                className="pl-8 my-4 relative"
                css={css`
                &:before {
                    content: "";
                    position: absolute;
                    background-color: #d1d5db;
                    border-radius: 50%;
                    width: .3333333em;
                    height: .3333333em;
                    top: calc(.8888889em - .1666667em);
                    left: .2222222em;
                }
            `}
            />,
            p: ({ children }) => (
                <p className="mb-8 leading-8">
                    {children}
                </p>
            )
        }}
    />
)

export default MarkdownContent