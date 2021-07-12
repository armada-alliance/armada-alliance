import React from 'react'
import enhanceClickOutside from 'react-click-outside'

class ClickOutside extends React.Component {

    render() {

        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        )
    }

    handleClickOutside = e => {

        if (this.props.onClickOutside) {
            this.props.onClickOutside(e)
        }
    }
}

export default enhanceClickOutside(ClickOutside)