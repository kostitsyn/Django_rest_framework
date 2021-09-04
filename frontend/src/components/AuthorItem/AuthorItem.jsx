import c from './AuthorItem.module.css';

const AuthorItem = (props) => {
    return (
        <tr className={c.rowTable}>
            <td>
                {props.author.first_name}
            </td>
            <td>
                {props.author.last_name}
            </td>
            <td>
                {props.author.birthday_year}
            </td>
        </tr>
    )
}

export default AuthorItem;