const defaultState = {
    token:"",
    user: null,
    userFetched: false,
    loading: true
}

// Creates copy of original state 
const newState = (state, info) => Object.assign({}, state, info)

// Reducer 
export const reducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_TOKEN":
            return newState(state, { token: action.token, loading: true})
        case "ADD_USER_SUCCESS":
            return newState(state, {
                user: action.user,
                userFetched: true
            })
        case "ADD_USER_FAILURE":
            return newState(state, { user: false, userFetched: true })
        case "USER_LOGOUT_SUCCESS":
            return newState(state, { user: null, token: "", userFetched: false })
        case "NOT_LOADING":
            return newState(state, {loading: false})
        default:
            return state
    }
}

export default {reducer}