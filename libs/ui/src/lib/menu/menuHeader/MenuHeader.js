import React from "react"
import PropTypes from "prop-types"

function MenuHeader(props) {

    return <>
        <div className="m-2 d-flex justify-content-between align-items-center">
            <div className="font-weight-normal">{props.name}</div>
            <span className="badge badge-primary badge-pill">{props.total}</span>
        </div>
    </>
}

MenuHeader.propTypes = {
    name: PropTypes.string,
    total: PropTypes.number
}

export default MenuHeader