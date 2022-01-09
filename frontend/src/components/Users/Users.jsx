import UserItem from "./UserItem/UserItem";
import c from './Users.module.css';

const Users = (props) => {
    let usersElements = props.state.users.map(user => <UserItem user={user} key={user.uuid}/>)


    return(
        <div>
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
            {props.state.isFirstUsersPage ? null : <button onClick={() => props.changePage('users', 'previous')}>Previous page</button>}
            {props.state.isLastUsersPage ? null : <button onClick={() => props.changePage('users', 'next')}>Next page</button>}
            <div>Текущая страница: {props.state.usersPage}</div>
        </div>
    )
}

export default Users;