const AuthorBookItem = ({book}) => {
    let BookAuthors = book.authors.map(author => `${author.first_name} ${author.last_name}`)
    return (
        <tr>
            <td>{book.uuid}</td>
            <td>{book.name}</td>
            <td>{BookAuthors.join('***')}</td>
        </tr>
    )
}

export default AuthorBookItem;