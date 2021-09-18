import UserItem from "./UserItem/UserItem";
import c from './Users.module.css';

const Users = ({users}) => {
    let usersElements = users.map(user => <UserItem user={user} key={user.uuid}/>)
    return(
        <table className={c.users}>
            <thead>
                <tr>
                    <th>
                        Login
                    </th>
                    <th>
                        Full name
                    </th>
                    <th>
                        Email
                    </th>
                </tr>
                {usersElements}
            </thead>
        </table>
    )
}

export default Users;