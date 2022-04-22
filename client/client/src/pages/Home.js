import Register from '../components/Register';
import Login from '../components/Login';
import home from '../css/home.css';
import { useState } from 'react'; 

const Home = ({addToken}) => {
    // View state 
    const [view, setView] = useState("login")

    return (
        <div id="home-page">
            <ul id="navbar">
                <li><button className="nav-btn" onClick={() => setView("login")}>Login</button></li>
                <li><button className="nav-btn" onClick={() => setView("register")}>Register</button></li>
            </ul>
            <div id="home-main-view">
                {view === "login" && <Login addToken={addToken} />}
                {view === "register" && <Register />}
            </div>
        </div>
    )
}

export default Home;
