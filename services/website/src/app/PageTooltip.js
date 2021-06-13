import React, { useState } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { css } from "@emotion/react";
import Popover from "./Popover";
import Portal from "./Portal";
import Markdown from "./Markdown";
import pages from '../pages'

function QuestionIcon(props) {

    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.997-111.043 248-248 248S8 392.997 8 256C8 119.083 119.043 8 256 8s248 111.083 248 248zM262.655 90c-54.497 0-89.255 22.957-116.549 63.758-3.536 5.286-2.353 12.415 2.715 16.258l34.699 26.31c5.205 3.947 12.621 3.008 16.665-2.122 17.864-22.658 30.113-35.797 57.303-35.797 20.429 0 45.698 13.148 45.698 32.958 0 14.976-12.363 22.667-32.534 33.976C247.128 238.528 216 254.941 216 296v4c0 6.627 5.373 12 12 12h56c6.627 0 12-5.373 12-12v-1.333c0-28.462 83.186-29.647 83.186-106.667 0-58.002-60.165-102-116.531-102zM256 338c-25.365 0-46 20.635-46 46 0 25.364 20.635 46 46 46s46-20.636 46-46c0-25.365-20.635-46-46-46z"></path></svg>
    )
}

const PageTooltip = (props) => {

    const [open, setOpen] = useState(false);

    const page = pages.find(page => page.slug === props.slug)

    if (!page) {
        return props.children
    }

    return (
        <Manager>
            <Reference>
                {({ ref }) => (
                    <div className="relative inline-flex items-center cursor-pointer" ref={ref} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
                        <div>
                            {props.children}
                        </div>
                        <div
                            className="-mt-2 ml-1 mr-1 w-4 h-4 bg-white rounded-full flex items-center justify-center text-primary-500 bg-primary-100"
                            css={css`
                                &:hover {
                                    background-color: rgba(1, 145, 251, 0.2);
                                }
                                &:active {
                                    background-color: var(--color-primary);
                                    color: #fff;
                                }
                            `}
                        >
                            <QuestionIcon className="h-4" />
                        </div>
                    </div>
                )}
            </Reference>
            {open ? (
                <Popper placement={props.placement || "top"}>
                    {({ ref, style, placement, arrowProps }) => (
                        <Portal onClose={() => setOpen(false)}>
                            <div
                                ref={ref}
                                style={style}
                                data-placement={placement}
                                css={css`
                  z-index: 1300;
                `}
                            >
                                <Popover placement={placement}>
                                    <div className="p-6">
                                        <div className="font-bold">{page.title}</div>
                                        <div className="mt-2">
                                            <Markdown
                                                children={page.description}
                                                className="text-sm"
                                            />
                                        </div>
                                    </div>
                                </Popover>
                                <div ref={arrowProps.ref} style={arrowProps.style} />
                            </div>
                        </Portal>
                    )}
                </Popper>
            ) : null}
        </Manager>
    );
};

export default PageTooltip;