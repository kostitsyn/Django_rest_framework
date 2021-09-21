import c from './Menu.module.css';
import MenuItem from "./MenuItem/MenuItem";

const Menu = (props) => {
    let ItemElements = props.items.map(item => <MenuItem item={item} isAuthenticated={props.isAuthenticated} logout={props.logout} key={item}/>)
    return(
        <nav className={c.menu}>
            <ul>
                {ItemElements}
            </ul>
             <ul>{(props.isAuthenticated() ? 'Hello' : '')} {props.username}</ul>
        </nav>
    )
}

export default Menu;