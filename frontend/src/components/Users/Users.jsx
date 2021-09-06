import UserItem from "./UserItem/UserItem";
import c from './Users.module.css';

const Users = ({users}) => {
    let usersElements = users.map(user => <UserItem user={user}/>)
    return(
        <table className={c.users}>
            <th>
                Login
            </th>
            <th>
                Full name
            </th>
            <th>
                Email
            </th>
            {usersElements}
        </table>
    )
}

export default Users;