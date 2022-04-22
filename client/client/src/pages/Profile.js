import profile from '../css/profile.css';
const Profile = ({ user, removeUser }) => {
    // Handle logout 
    const handleLogout = () => {
        removeUser()
    }

    // Extract what is needed from user object
    const { firstName, lastName } = user

    return (
        <div className="container" id="welcome-page">
            <div id="welcome-user">
                Welcome, {firstName} {lastName}
            </div>
            <button className="btn btn-danger" onClick={handleLogout}>Log out</button>
        </div>
    )
}

export default Profile;