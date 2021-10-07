import UserItem from "./UserItem/UserItem";
import c from './Users.module.css';

const Users = (props) => {
    let usersElements = props.users.map(user => <UserItem user={user} key={user.uuid}/>)


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
            {props.isFirstUsersPage ? null : <button onClick={() => props.changePage('users', 'previous')}>Previous page</button>}
            {props.isLastUsersPage ? null : <button onClick={() => props.changePage('users', 'next')}>Next page</button>}
            <div>Текущая страница: {props.currentPage}</div>
        </div>
    )
}

export default Users;