
const defaultState = {
    isAuthenticated: false,
    refresh: "",
    access: ""
}

const authenticateReducer = (state, action) => {
    switch (action.type) {
        case "AUTHENTICATE":
            return {
                isAuthenticated: true,
                refresh: action.payload.refresh,
                access: action.payload.access
            }
        case "REFRESH_TOKEN": 
            console.log(action)
            return  {
                isAuthenticated: true,
                refresh: action.payload.refresh,
                access: action.payload.access
            }
        case "LOGOUT":
                return defaultState
        default:
            return defaultState
    }
}


export default authenticateReducer