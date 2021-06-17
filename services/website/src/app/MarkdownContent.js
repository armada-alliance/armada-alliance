import React from 'react'
import { css } from '@emotion/react'
import PageTooltip from './PageTooltip'
import { MDXRemote } from 'next-mdx-remote'
import ReactPlayer from 'react-player'

function YoutubeVideo({ url, description }) {
    return (
        <div>

            <div className="relative rounded-lg overflow-hidden shadow-md">
                <ReactPlayer
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0
                    }}
                    width={'100%'}
                    height={'100%'}
                    url={url}
                    controls={true}
                />
                <div style={{ paddingTop: '56%' }} />
            </div>
            <div className="flex justify-end">
                {description ? (
                    <div className="mt-1.5 uppercase font-light text-sm text-gray-400">
                        {description}
                    </div>
                ) : null}
            </div>
        </div>
    )
}

const components = {
    YoutubeVideo,
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
}

const MarkdownContent = props => (
    <div>
        <MDXRemote {...props.source} components={components} />
        {props.children}
        {/* <ReactMarkdown
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
        /> */}
    </div>
)

export default MarkdownContent