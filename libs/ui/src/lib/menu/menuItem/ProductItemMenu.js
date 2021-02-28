import React, { useState } from 'react'
import './ProductItemMenu.css'
import PropTypes from "prop-types"


function ProductItemMenu({ item, handleAvailable }) {
    let { uuid, name, description, imageUrl, price, availability } = item

    const [available, setAvailability] = useState(availability === 'AVAILABLE' ? true : false)


    return (
        <div className={"ItemMenu-container "} key={uuid}>
            <div className="item-left">
                <div className="item-img-container">
                    <img src={imageUrl}
                        className={"ItemMenu-img " + (!available ? 'grey-disabled' : '')}
                        alt="imagen del producto" />
                </div>

                <div className={"item-description " + (!available ? 'grey-disabled' : '')}>
                    <h5>{name}</h5>
                    <p id="price">${price}</p>
                    <p className="small">{description}</p>
                </div>
            </div>

            <div className="item-action custom-control custom-switch custom-switch-md">
                <input className="custom-control-input btn-lg"
                    type="checkbox"
                    id={uuid}
                    checked={available}
                    onChange={() => { setAvailability(!available); handleAvailable(uuid, !available); }} />

                <label className="custom-control-label" htmlFor={uuid} />

            </div>

        </div>
    )
}


ProductItemMenu.propTypes = {
    item: PropTypes.object,
    handleAvailable: PropTypes.func
}


export default ProductItemMenu
