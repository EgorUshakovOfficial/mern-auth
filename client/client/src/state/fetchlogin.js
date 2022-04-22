import {
    addUserSuccess,
    addUserFailure
} from './actions.js';

export const fetchLogin = token => dispatch => {
    // Retrieve user data 
    return fetch('http://localhost:4000/user', {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "Authorization": `bearer ${token}`
        }
    })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            const { user } = data
            if (user) {
                dispatch(addUserSuccess(user))
            } else {
                dispatch(addUserFailure())
            }
        })
        .catch(err => {
            console.log(err)
        })
}

export default fetchLogin;
