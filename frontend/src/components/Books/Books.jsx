import BookItem from "./BookItem/BookItem";
import c from './Books.module.css';

const Books = ({books, deleteBook}) => {
    let booksElem = books.map(book => <BookItem book={book} deleteBook={deleteBook} key={book.uuid}/>)
    return (
        <table border='1'>
            <tbody>
                <tr>
                    <th>UUID</th>
                    <th>Name</th>
                    <th>Author</th>
                    <th></th>
                </tr>
                {booksElem}
            </tbody>
        </table>
    )
}

export default Books;