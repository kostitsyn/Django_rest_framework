const AuthorBookItem = ({book}) => {
    return (
        <tr>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.author.name}</td>
        </tr>
    )
}

export default AuthorBookItem;