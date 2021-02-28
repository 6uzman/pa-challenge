import React, { Component } from "react"
import CustomFetch from "../fetch/CustomFetch"
import { MenuCategory } from "@parrot-challenge/ui"
import "./MenuEdition.css"

class MenuEdition extends Component {
    constructor(props) {
        super(props)
        this.state = {
            error: undefined,
            store: undefined,
            categories: undefined
        }
    }


    async componentDidMount() {
        await this.loadStores()
        console.log(this.state.store)
        if (this.state.store) {
            await this.loadMenu()
        }
    }



    loadStores = async () => {
        const response = await CustomFetch.get("/api/v1/users/me")
        if (response && response.status === "ok" && response.result) {
            if (response.result.stores && response.result.stores.length > 0) {
                this.setState({
                    store: response.result.stores[0]
                })
            } else {
                this.setState({
                    error: "No se encontraron tiendas asociadas"
                })
            }
        } else {
            this.setState({
                error: "No se pueden recuperar los datos en este momento"
            })
        }
    }

    loadMenu = async () => {
        const response = await CustomFetch.get(`/api/v1/products/?store=${this.state.store.uuid}`)
        if (response && response.status === "ok" && response.results) {
            const ordered = this.convertionCollection(response.results)
            this.setState({
                categories: ordered
            })
        } else {
            this.setState({
                error: "No se encontraron productos para su tienda"
            })
        }
    }

    updateStatusItem = (uuid, available) => {
        for (let category in categories) {
            const prod = category.products.filter(product => product.uuid === uuid)
            if (prod) {
                this.setState({
                    error: "No se encontraron productos para su tienda"
                })
            }
        }
    }

    convertionCollection = (results) => {
        const categoriesSet = []

        const isRepeated = (array, item) => {
            return array.some(element => element.uuid === item.uuid)
        }

        results.forEach(item => {
            if (!isRepeated(categoriesSet, item.category)) {
                categoriesSet.push(item.category)
            }
        })

        categoriesSet.forEach(category => {
            const products = results.filter(item => item.category.uuid === category.uuid)
            category.products = products.map(element => {
                return {
                    uuid: element.uuid,
                    name: element.name,
                    description: element.description,
                    imageUrl: element.imageUrl,
                    price: element.price,
                    availability: element.availability
                }
            })
        })
        console.log(categoriesSet)
        return categoriesSet
    }


    handleItemStatusChange = async (uuid, status) => {
        console.log("cambiar status", uuid, status)
        //"availability": "AVAILABLE",
        const requestBody = {
            availability: status ? "AVAILABLE" : "UNAVAILABLE"
        }

        const response = await CustomFetch.update(`/api/v1/products/${uuid}/availability`, requestBody)
        if (response && response.status === "ok") {
            console.log("Update OK")

        }
    }


    render() {
        return <>
            <div className="container mt-4">
                <div className="row justify-content-center">
                    <div className="col-12 col-lg-8">
                        {this.state.store && <h2>{this.state.store.name}</h2>}
                    </div>
                    <div className="col-12 col-lg-8">
                        {
                            this.state.categories && this.state.categories.map(element => {
                                return <MenuCategory key={element.uuid}
                                    header={{ name: element.name, total: element.products.length }}
                                    body={element.products}
                                    handleStatusChange={this.handleItemStatusChange} />

                            })
                        }
                    </div>
                    <div className="col-8">
                        {
                            this.state.error &&
                            <div className="row">
                                <div className="col">
                                    <p className={"text-danger"}>{this.state.error}</p>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </>
    }
}

export default MenuEdition