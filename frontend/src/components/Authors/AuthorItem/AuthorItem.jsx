import c from './AuthorItem.module.css';
import {NavLink} from "react-router-dom";

const AuthorItem = (props) => {
    return (
        <tr className={c.rowTable}>
            <td><NavLink to={`author/${props.author.id}`}>{props.author.id}</NavLink></td>
            <td>{props.author.name}</td>
            <td>{props.author.birthday_year}</td>
        </tr>
    )
}

export default AuthorItem;