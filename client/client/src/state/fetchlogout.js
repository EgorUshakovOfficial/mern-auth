import {userLogoutSuccess} from './actions.js';

export const fetchLogout = () => async dispatch => {
    // Send request to logout API endpoint to remove refresh token from http-only cookie 
    return fetch('http://localhost:4000/logout', {
        method: "GET",
        credentials:"include"
    })
        .then(res => res.json())
        .then(async data => {
            await dispatch(userLogoutSuccess())
        })
        .catch(err => console.log(err))
}

export default fetchLogout; 
