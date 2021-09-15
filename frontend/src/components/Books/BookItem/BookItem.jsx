import c from './BooksItem.module.css';

const BookItem = ({item}) => {
    return (
        <tr>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.author.name}</td>
        </tr>
    )
}

export default BookItem;