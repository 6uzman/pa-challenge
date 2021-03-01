import React from "react"
import PropTypes from "prop-types"

function MenuHeader(props) {

    return <>
        <div className="m-2 d-flex justify-content-between align-items-center">
            <div className="d-flex">
                <div className={"mr-2 d-inline " + (props.isOpen ? "openSectionMark" : "")}>&#62;</div>
                <div className="font-weight-normal">{props.name}</div>
            </div>

            <span className="badge badge-primary badge-pill">{props.total}</span>
        </div>
    </>
}

MenuHeader.propTypes = {
    isOpen: PropTypes.boolean,
    name: PropTypes.string,
    total: PropTypes.number
}

export default MenuHeader