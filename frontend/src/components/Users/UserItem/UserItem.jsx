const UserItem = ({user}) => {
    return(
        <tr>
            <td>
                {user.username}
            </td>
            <td>
                {user.firstname} {user.lastname}
            </td>
            <td>
                {user.email}
            </td>
        </tr>
    )
}

export default UserItem;