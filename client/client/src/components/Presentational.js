import { ReactReduxContext } from 'react-redux';
import {useState, useContext, useEffect } from 'react';
import Home from '../pages/Home';
import ProviderAuth from '../components/ProviderAuth'; 



const Presentational = ({setTimer, notLoading, addToken, fetchUser, removeUser }) => {
    // Store-where state resides in
    const { store } = useContext(ReactReduxContext);

    // State of application
    let {
        token,
        user,
        userFetched,
        loading,
        timer
    } = store.getState()

    // Silient timer 
    const [callApi, setCallApi] = useState(false)

    // Verify user
    const verifyUser = () => {
        fetch('http://localhost:4000/refreshToken', {
            method: "POST",
            credentials: "include"
        })
            .then(async res => {
                if (res.ok) {
                    const data = await res.json()
                    let token = data.token
                    addToken(token)
                }
            })
            .catch(err => console.log(err))
    }

    // Checks if refresh token exists as http-only as cookie
    // using a non-http only cookie, set as connect-sid
    useEffect(() => {
        if (document.cookie && !token) {
            // Page loads 
            verifyUser()
        }
        else if (token && userFetched === false) {
            fetchUser(token)
        }
        else if (loading) {
            notLoading()
        }
        else if (loading === false && token && document.cookie && timer === "") {
            setCallApi(true)
        }
    })

    useEffect(() => {
        if (loading === false && token && document.cookie && timer === "") {
            const timer = setInterval(verifyUser, 1000*30)
            setTimer(timer)
        }
    }, [callApi])
   
    return (
        <div>
            {loading &&
                <div id="spinner-container" style={{ display: "flex", justifyContent: "center" }}>
                    <div className="spinner-border" role="status">
                        <span className="sr-only" style={{border: "3px solid red"}}>Loading...</span>
                    </div>
                </div>
            }
            {loading === false &&
                <ProviderAuth user={user} removeUser={removeUser}>
                    <Home addToken={addToken} />
                </ProviderAuth>
            }
        </div>
    )
}

export default Presentational;
