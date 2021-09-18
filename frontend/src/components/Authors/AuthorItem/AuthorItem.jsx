import c from './AuthorItem.module.css';
import {NavLink} from "react-router-dom";

const AuthorItem = (props) => {
    return (
        <tr className={c.rowTable}>
            <td><NavLink to={`author/${props.author.uuid}`}>{props.author.uuid}</NavLink></td>
            <td>{props.author.firstName} {props.author.lastName}</td>
            <td>{props.author.birthdayYear}</td>
        </tr>
    )
}

export default AuthorItem;