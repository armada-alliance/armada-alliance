import React from "react";
import { css, keyframes } from "@emotion/react";

const fadeIn = keyframes`
from {
    opacity: 0;
    visibility: hidden;
}
to {
    opacity: 1;
    visibility: visible;
}
`;

const Popover = ({ children, placement }) => (
    <div
        className="ml-2 mr-2 md:mx-auto max-w-md bg-gray-700 text-white shadow-lg rounded-lg overflow-hidden"
        css={css`
        animation-name: ${fadeIn};
        animation-duration: 400ms;
        animation-fill-mode: both;
        ${placement.slice(0, "bottom".length) === "bottom"
                ? "margin-top: 10px;"
                : ""
            }
        ${placement.slice(0, "top".length) === "top"
                ? "margin-bottom: 10px;"
                : ""
            }
        ${placement.slice(0, "left".length) === "left"
                ? "margin-right: 10px;"
                : ""
            }
        ${placement.slice(0, "right".length) === "right"
                ? "margin-left: 10px;"
                : ""
            }
        `}
    >
        {children}
    </div>
);

export default Popover;