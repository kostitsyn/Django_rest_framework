import {NavLink} from "react-router-dom";

const MenuItem = ({item}) => {
    return (
        <li>
            <NavLink to={item.toLowerCase()}>{item}</NavLink>
        </li>
    )
}

export default MenuItem;