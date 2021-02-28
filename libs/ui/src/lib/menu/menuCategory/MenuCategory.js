import React, { useState } from "react"
import MenuHeader from "../menuHeader/MenuHeader"
import ProductItemMenu from "../menuItem/ProductItemMenu"

function MenuCategory(props) {
    const { header, body, handleStatusChange } = props
    const [isShowed, setShowed] = useState(false)

    // console.log("header: ", header)
    // console.log("body", body)
    // console.log("isShowed", isShowed)

    return (<>
        <div className="card">
            <div className="card-header">
                <div className="mb-0">
                    <button className="btn btn-link btn-block text-left"
                        type="button"
                        onClick={() => setShowed(!isShowed)}
                        aria-controls="collapseCategory">
                        <MenuHeader name={header.name} total={header.total} />
                    </button>
                </div>
            </div>

            {
                isShowed && <div >
                    {
                        body && body.length > 0 && body.map(item => {
                            return <ProductItemMenu item={item} handleAvailable={handleStatusChange} />
                        })
                    }
                </div>
            }
        </div>
    </>)
}



export default MenuCategory