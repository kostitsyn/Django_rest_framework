import BookItem from "./BookItem/BookItem";
import c from './Books.module.css';
import {Link} from "react-router-dom";

const Books = ({books, deleteBook}) => {
    let booksElem = books.map(book => <BookItem book={book} deleteBook={deleteBook} key={book.uuid}/>)
    return (
        <div>
            <table border='1'>
                <tbody>
                    <tr>
                        <th>UUID</th>
                        <th>Name</th>
                        <th>Author</th>
                        <th/>
                    </tr>
                    {booksElem}
                </tbody>
            </table>
            <Link to='/book/create'>Create</Link>
        </div>
    )
}

export default Books;