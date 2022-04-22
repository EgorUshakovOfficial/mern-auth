// Action creators
export const addToken = token => ({ type: "ADD_TOKEN", token })
export const addUserSuccess = user => ({ type: "ADD_USER_SUCCESS", user })
export const addUserFailure = () => ({ type: "ADD_USER_FAILURE" })
export const userLogoutSuccess = () => ({ type: "USER_LOGOUT_SUCCESS" })
export const notLoading = () => ({type: "NOT_LOADING"})
export default {
    addToken,
    addUserSuccess,
    addUserFailure,
    userLogoutSuccess,
    notLoading
};