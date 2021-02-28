import { render, unmountComponentAtNode } from "react-dom"
import { act,Simulate } from "react-dom/test-utils"
import LoginCard from "./LoginCard"

let container = null

beforeEach(() => {
    container = document.createElement("div")
    document.body.appendChild(container)
})
  
afterEach(() => {
    // limpieza al salir
    unmountComponentAtNode(container)
    container.remove()
    container = null
})

it("LoginCard load component", () => {
    const validation = jest.fn()
    const history = jest.fn()
    act(() => {
      render(<LoginCard credentialValidation={validation} history={history} nextRoute="/farAway" />, container)
    }) 
    const labels = container.querySelectorAll("label")
    expect(labels.length).toBe(2)
    expect(labels[0].textContent).toBe("Usuario")
    expect(labels[1].textContent).toBe("Contraseña")

    const inputs = container.querySelectorAll("input")
    expect(inputs.length).toBe(2)
    expect(container.querySelector("button").textContent).toBe("Ingresar")
})


it("LoginCard Empty fields", () => {
    const validation = jest.fn()
    const history = jest.fn()
    act(() => {
      render(<LoginCard credentialValidation={validation} history={history} nextRoute="/farAway" />, container)
    }) 
    
    act(() => {
        container.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })
    expect(container.querySelectorAll("small").length).toBe(2)
    expect(container.querySelector("small").textContent).toBe("Este campo no puede ser vacío")
})


it("LoginCard send form", async () => {
    const errors = [{ 
            message: "No active account found with the given credentials" 
        }]

    const validation = jest.fn((username, password ) =>  Promise.resolve({ errors }))
    const history = jest.fn((path) => path )

    const credentials = {
        user: "miguel",
        password: "guzman"
    }
    act(() => {
      render(<LoginCard credentialValidation={validation} history={history} nextRoute="/farAway" />, container)
    }) 
    
    const usernameInput = container.querySelector("input[id='form-input-user']")
    Simulate.change(usernameInput, { target: { id: 'form-input-user', value: credentials.user } })

    const pwdInput = container.querySelector("[id='form-input-pwd']")
    Simulate.change(pwdInput, { target: { id: 'form-input-pwd', value: credentials.password } })

    await act(() => {
         container.querySelector("button").dispatchEvent(new MouseEvent("click", { bubbles: true }))
    })

    expect(container.querySelector("p").textContent).toBe(errors[0].message)
})