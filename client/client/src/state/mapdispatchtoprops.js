import {
    addToken,
    notLoading,
    addSilentTimer
} from './actions.js';

import { fetchLogin } from './fetchlogin.js';
import { fetchLogout } from './fetchlogout.js'; 

export const mapDispatchToProps = dispatch => {
    return {
        addToken: token => {
            dispatch(addToken(token))
        },
        fetchUser: token => {
            dispatch(fetchLogin(token))
        },
        removeUser: () => {
            dispatch(fetchLogout())
        },
        notLoading: () => {
            dispatch(notLoading())
        },
        setTimer: timer => {
            dispatch(addSilentTimer(timer))
        }
    }
}

export default mapDispatchToProps;