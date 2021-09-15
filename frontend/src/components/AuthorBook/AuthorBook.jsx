import AuthorBookItem from "./AuthorBookItem/AuthorBookItem";
import {useParams} from 'react-router-dom';

const AuthorBookList = ({books}) => {
    let { id } = useParams();
    let filtered_items = books.filter(book => book.author.id == id)
    let booksElements = filtered_items.map(item => <AuthorBookItem book={item} key={item.id}/>)
    return (
        <table>
            <tbody>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Author</th>
                </tr>
                {booksElements}
            </tbody>
        </table>
    )
}

export default AuthorBookList;