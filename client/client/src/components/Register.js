import { useState } from 'react';
import register from '../css/register.css'; 
const Register = () => {
    // State 
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    // Event handler for form submission
    const handleRegistration = e => {
        // Prevent registration form from submitting to server, which is its default behaviour
        e.preventDefault()

        // Submit form to proxy server 
        fetch("http://localhost:4000/register", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password
            }),
            credentials: "include"
        })
            .then(res => res.json())
            .then(data => {
                const { success, token } = data
                if (success) {
                    // Update state of application here...
                    setSuccess("User is successfully registered and may now log in")
                }
            })
            .catch(err => {
                setError("Error! Something went wrong. Please try again")
            })
    }

    return (<form id="registration-form" onSubmit={handleRegistration}>
        <h2 className="title">Registration</h2>
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
            <label for="register-first-name">First Name:</label>
            <input name="firstName" className="form-control" id="register-first-name" placeholder="Enter first name" value={firstName} onChange={e => setFirstName(e.target.value)}required/>
        </div>
        <div className="form-group">
            <label for="register-last-name">Last Name:</label>
            <input name="lastName" className="form-control" id="register-last-name" placeholder="Enter last name" value={lastName} onChange={e => setLastName(e.target.value)}required />
        </div>
        <div className="form-group">
            <label for="register-email">Email:</label>
            <input type="email" name="email" className="form-control" id="register-email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}required />
        </div>
        <div className="form-group">
            <label for="register-password">Password:</label>
            <input type="password" name="password" className="form-control" id="register-password" placeholder="Enter password" value={password} onChange={e => setPassword(e.target.value)}required />
        </div>
        <div className="form-group"></div>
        <button id="register-submit" className="btn btn-block btn-success" type="submit">Submit</button>
    </form>)
}


export default Register;