import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import PageTooltip from './PageTooltip'
import Prism from 'prismjs'
import cx from 'classnames'
// import "prismjs/themes/prism-tomorrow.css";

function Code({ children }) {

    useEffect(() => {
        if (typeof window !== 'undefined') {
            Prism.highlightAll();
        }
    }, []);

    return (
        <code className="language-html text-sm">
            {children}
        </code>
    )
}

const markdownComponents = ({ spacingEnabled }) => ({
    a: (props) => (
        <PageTooltip slug={props.href}>
            <a {...props} className="text-gray-900 dark:text-gray-100 font-medium underline" />
        </PageTooltip>
    ),
    h1: props => <h2 {...props} className="block text-2xl sm:text-3xl leading-8 font-bold text-gray-900 dark:text-gray-100 mb-3 mt-6">H1 should not be used, use H2 instead</h2>,
    h2: props => <h2 {...props} className="block text-1xl sm:text-2xl leading-8 font-bold text-gray-900 dark:text-gray-100 mb-3 mt-5 pb-3 border-b border-gray-200 dark:border-gray-700" />,
    h3: props => <h3 {...props} className="block text-xl sm:text-1xl leading-8 font-bold text-gray-900 dark:text-gray-100 mb-3 mt-4 pb-2 border-b border-gray-200 dark:border-gray-700" />,
    ul: props => <ul {...props} className="my-8" />,
    strong: props => <strong {...props} className="font-bold text-gray-900 dark:text-gray-100" />,
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
        <div className={cx(spacingEnabled ? "mb-8 leading-8" : null)}>
            {children}
        </div>
    ),
    blockquote: ({ children }) => (
        <blockquote className="border-l-4 dark:border-gray-100 pl-4 font-bold italic dark:text-gray-100">
            {children}
        </blockquote>
    ),
    pre: props => (
        <pre {...props} className="mb-8" />
    ),
    img: props => (
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 shadow-md overflow-hidden">
            <img {...props} />
        </div>
    ),
    iframe: props => (
        <div className="md:-mx-24">
            <div
                className="bg-gray-100 dark:bg-gray-700 rounded-lg border border-gray-200 shadow-md overflow-hidden"
                style={{
                    WebkitMaskImage: "-webkit-radial-gradient(white, black)", // Safari HACK for rounded corners
                }}
            >
                <iframe {...props} className="w-full" />
            </div>
        </div>

    ),
    code: Code
})

export default markdownComponents