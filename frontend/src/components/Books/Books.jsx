import BookItem from "./BookItem/BookItem";
import c from './Books.module.css';

const Books = ({books}) => {
    let booksElem = books.map(book => <BookItem item={book} key={book.id}/>)
    return (
        <table border='1'>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                </tr>
                {booksElem}
            </tbody>
        </table>
    )
}

export default Books;