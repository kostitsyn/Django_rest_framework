import AuthorBookItem from "./AuthorBookItem/AuthorBookItem";
import {useParams} from 'react-router-dom';

const AuthorBookList = ({books}) => {
    let { uuid } = useParams();

    // let filtered_items = books.filter(book => book.authors.filter(author => author.uuid == uuid))
    let filtered_items = [];
    for (let i in books) {
        let authors = books[i].authors;
        for (let j in authors) {
            if (authors[j].uuid == uuid) {
                filtered_items.push(books[i])
                break;
            }
        }
    }
    let booksElements = filtered_items.map(item => <AuthorBookItem book={item} key={item.uuid}/>)
    return (
        <table>
            <tbody>
                <tr>
                    <th>UUID</th>
                    <th>Name</th>
                    <th>Author</th>
                </tr>
                {booksElements}
            </tbody>
        </table>
    )
}

export default AuthorBookList;