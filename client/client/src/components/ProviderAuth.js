import Profile from '../pages/Profile';

const ProviderAuth = ({ user, removeUser, children}) => {
    if (user) {
        return <Profile user={user} removeUser={removeUser}/>
    }
    return children
}

export default ProviderAuth;