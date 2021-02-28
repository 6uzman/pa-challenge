import React, { Component } from "react"
import CustomFetch from "../fetch/CustomFetch"

class MenuList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            menuCollection = []
        }
    }

    componentDidMount() {
        this.loadMenu()
    }

    loadStores = () => {
        CustomFetch.get("", {})
    }



    
    render() {
        return <>
            {
                this.state.menuCollection.map(element => {
                    <ProductItemMenu item={element} handleAvailable={handleAvailable}/> 

                })
            }
            </>
    }
}

export default MenuList