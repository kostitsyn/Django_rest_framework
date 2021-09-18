const AuthorBookItem = ({book}) => {
    debugger;
    let BookAuthors = book.authors.map(author => `${author.firstName} ${author.lastName}`)
    return (
        <tr>
            <td>{book.uuid}</td>
            <td>{book.name}</td>
            <td>{BookAuthors}</td>
        </tr>
    )
}

export default AuthorBookItem;