import React, { useState, useContext } from "react";
import { Manager, Reference, Popper } from "react-popper";
import { css } from "@emotion/react";
import Popover from "./Popover";
import Portal from "./Portal";
import Markdown from "./Markdown";
import Context from "./Context";
import * as uuid from 'uuid'
import formatImage from './formatImage'
import markdownToText from 'markdown-to-text'

let tooltipCache = {}

const WithPageTooltip = (props) => {

    const ctx = useContext(Context)

    const [id] = useState(uuid.v4());
    const [open, setOpen] = useState(false);

    const page = ctx.pages.find(page => page.slug === props.slug)

    if (!page) {
        return props.children
    }

    return (
        <Manager>
            <Reference>
                {({ ref }) => props.children({
                    ref,
                    onMouseEnter: () => {
                        tooltipCache[id] = setTimeout(() => {
                            setOpen(true)
                            clearTimeout(tooltipCache[id])
                            tooltipCache[id] = null
                        }, props.delay || 0)
                    },
                    onMouseLeave: () => {
                        if (tooltipCache[id]) {
                            clearTimeout(tooltipCache[id])
                            tooltipCache[id] = null
                        } else {
                            setOpen(false)
                        }
                    }
                })}
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
                                    <div className="p-4 flex items-center space-x-4" style={{ minWidth: 120 }}>
                                        {page.image ? (
                                            <div className="flex-shrink-0 bg-white h-12 w-12 rounded-full ring-2 ring-white bg-center bg-no-repeat bg-cover" style={{ backgroundImage: `url(${formatImage(page.image)})` }} />
                                        ) : null}
                                        {page.icon ? (
                                            <div className="flex-shrink-0 bg-white h-12 w-12 rounded-full ring-2 ring-white flex items-center justify-center text-2xl">
                                                {page.icon}
                                            </div>
                                        ) : null}
                                        <div>
                                            <div className="font-bold">{markdownToText(page.title)}</div>
                                            <div className="">
                                                <Markdown
                                                    children={markdownToText(page.description)}
                                                    className="text-sm"
                                                />
                                            </div>
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

export default WithPageTooltip;