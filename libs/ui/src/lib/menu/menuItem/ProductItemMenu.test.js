import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import ProductItemMenu from "./ProductItemMenu"

let container = null
const itemTest =  {
    uuid: "2618ec65-f996-4b12-898b-b6cf1cc32384",
    name: "Combo Amigos",
    description: "2 Subs de 15 cm (elige entre Jamón de Pavo, Sub de Pollo o Atún) + 2 bebidas embotelladas de 600 ml + 2 Bolsas de papas Sabritas o 2 galletas.",
    imageUrl: "https://d1ralsognjng37.cloudfront.net/b49451f6-4f81-404e-bb97-2e486100b2b8.jpeg",
    price: "189.00",
    availability: "AVAILABLE"
}

beforeEach(() => {
    // configurar un elemento del DOM como objetivo del renderizado
    container = document.createElement("div")
    document.body.appendChild(container)
})
  
afterEach(() => {
    // limpieza al salir
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it("ProductItemMenu load component", () => {
    const mockHandle = jest.fn()
    act(() => {
      render(<ProductItemMenu item={itemTest} handleAvailable={mockHandle}/>, container)
    }) 
    expect(container.querySelector("img").src).toBe(itemTest.imageUrl)
    expect(container.querySelector("h5").textContent).toBe(itemTest.name)
    expect(container.querySelector("#price").textContent).toBe("$" + itemTest.price)
    expect(container.querySelector("p.small").textContent).toBe(itemTest.description)
    expect(container.querySelector("#flexSwitchCheck").checked).toBe(true)
})


it("ProductItemMenu change status", () => {
    const localItem = {...itemTest, availability: "AVAILABLE"}
    const mockHandle = jest.fn()
    act(() => {
      render(<ProductItemMenu item={localItem} handleAvailable={mockHandle}/>, container)
    })

    const inputSwitch = container.querySelector("#flexSwitchCheck")
    expect(inputSwitch.checked).toBe(true)

    act(() => {
        inputSwitch.dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(inputSwitch.checked).toBe(false)
    expect(mockHandle).toBeCalled()

})