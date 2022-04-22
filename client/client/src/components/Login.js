import { useState } from 'react';
import login from '../css/login.css';

const Login = ({ addToken }) => {
    // State 
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")


    const handleLogin = e => {
        // Prevent form from submitting to proxy server
        e.preventDefault()

        // Submit form to the API login endpoint
        fetch("http://localhost:4000/login", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: "include"
        })
            .then(res => {
                if (res.status === 401) {
                    // Display error message for incorrect email address or password 
                    setError("Please provide a valid email address and password")
                } else {
                    // Update auth token in the state of the application
                    res.json()
                        .then(data => {
                            const { token } = data
                            addToken(token)
                        })
                }
            })
            .catch(err => {
                setError("Something went wrong! Please try again later.")
            })

    }

    return (
        <form id="login-form" onSubmit={handleLogin}>
            <h1 className="title">Login</h1>
            {error && <div className="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>{error}</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setError("")}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}
            {success && <div className="alert alert-success alert-dismissible fade show" role="alert">
                <strong>{success}</strong>
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={() => setSuccess("")}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>}
            <div className="form-group">
                <label for="login-email">Email:</label>
                <input type="email" className="form-control" id="login-email" name="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}  />
            </div>
            <div className="form-group">
                <label for="login-password">Password:</label>
                <input type="password" className="form-control" id="login-password" name="password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)} />
            </div>
            <button type="submit" className="btn btn-block btn-primary">Login</button>
        </form>
    )
}

export default Login; 