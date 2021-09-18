import c from './BooksItem.module.css';

const BookItem = ({book}) => {
    let BookAuthors = book.authors.map(author => `${author.firstName} ${author.lastName}`)
    return (
        <tr>
            <td>{book.uuid}</td>
            <td>{book.name}</td>
            <td>{BookAuthors.join('    ')}</td>
        </tr>
    )
}

export default BookItem;