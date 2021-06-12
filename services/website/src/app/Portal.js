import React from "react";
import ReactDOM from "react-dom";
import uniqueId from "lodash/uniqueId";
import ClickOutside from "./ClickOutside";

let portals = [];

export default class Portal extends React.Component {
    constructor(props) {
        super(props);
        if (!process.browser) {
            return
        }
        this.el = document.createElement("div");
    }

    componentDidMount() {
        if (!process.browser) {
            return
        }
        this.id = uniqueId("portal_");
        portals.push(this.id);
        this.el.tabIndex = 0;
        this.el.classList.add(this.id);
        this.el.classList.add("font-marketing");
        this.el.addEventListener("keydown", this.handleKeydown);

        // The portal element is inserted in the DOM tree after
        // the Modal's children are mounted, meaning that children
        // will be mounted on a detached DOM node. If a child
        // component requires to be attached to the DOM tree
        // immediately when mounted, for example to measure a
        // DOM node, or uses 'autoFocus' in a descendant, add
        // state to Modal and only render the children when Modal
        // is inserted in the DOM tree.
        const modalRoot = document.getElementsByTagName("body")[0];
        modalRoot.appendChild(this.el);
        // this.addNoScroll()
    }

    addNoScroll = () => {
        const html = document.getElementsByTagName("html")[0];
        if (html.classList.contains("nosroll") === false) {
            html.classList.add("noscroll");
        }
        const body = document.getElementsByTagName("body")[0];
        if (body.classList.contains("nosroll") === false) {
            body.classList.add("noscroll");
        }
    };

    removeNoScroll = () => {
        const html = document.getElementsByTagName("html")[0];
        html.classList.remove("noscroll");
        const body = document.getElementsByTagName("body")[0];
        body.classList.remove("noscroll");
    };

    componentWillUnmount() {
        const modalRoot = document.getElementsByTagName("body")[0];
        this.el.removeEventListener("keydown", this.handleKeydown);
        modalRoot.removeChild(this.el);
        portals = portals.filter((id) => id !== this.id);

        if (portals.length === 0) {
            // this.removeNoScroll()
        }
    }

    handleKeydown = (e) => {
        if (e.key === "Escape") {
            e.stopPropagation();

            this.handleClose(e);
        }
    };

    handleClose = (e) => {
        if (portals[portals.length - 1] !== this.id) {
            return;
        }

        if (this.props.onClose) {
            this.props.onClose();
        }
    };

    render() {
        if (!process.browser) {
            return null
        }
        return ReactDOM.createPortal(
            <ClickOutside onClickOutside={this.handleClose}>
                {this.props.children}
            </ClickOutside>,
            this.el
        );
    }
}