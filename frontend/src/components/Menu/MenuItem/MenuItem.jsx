import {NavLink} from "react-router-dom";

const MenuItem = ({item}, {isAuthenticated}) => {
    return (
        <li>
            {
                {if (item != 'Login') {
                <NavLink to={`/${item.toLowerCase()}`}>{item}</NavLink>
            }else{
                isAuthenticated() ? <button onClick={() => logout()}>Logout</button> : <NavLink to={`/${item.toLowerCase()}`}>{item}</NavLink>
            }
            }}

        </li>
    )
}

export default MenuItem;