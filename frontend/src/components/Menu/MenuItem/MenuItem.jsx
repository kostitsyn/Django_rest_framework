import {NavLink} from "react-router-dom";

const MenuItem = (props) => {

    let a = props.isAuthenticated();
    // debugger;
    return (
        <li>
            {props.item != 'Login' ? <NavLink to={`/${props.item.toLowerCase()}`}>{props.item}</NavLink> : (props.isAuthenticated() ? <button onClick={() => props.logout()}>Выйти</button> : <NavLink to={`/${props.item.toLowerCase()}`}>Войти</NavLink>)}
        </li>
    )
}

export default MenuItem;