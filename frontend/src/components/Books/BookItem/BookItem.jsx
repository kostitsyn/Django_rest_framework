import c from './BooksItem.module.css';

const BookItem = ({book, deleteBook}) => {
    let BookAuthors = book.authors.map(author => `${author.firstName} ${author.lastName}`)
    return (
        <tr>
            <td>{book.uuid}</td>
            <td>{book.name}</td>
            <td>{BookAuthors.join('    ')}</td>
            <td><button onClick={() => deleteBook(book.uuid)} type='button'>Delete</button></td>
        </tr>
    )
}

export default BookItem;