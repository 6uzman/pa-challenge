import { createStore, combineReducers } from "redux"
import authenticateReducer from './authenticateReducer'

const reducer = combineReducers({
    authenticate: authenticateReducer
})

const store = createStore(reducer)

export default store