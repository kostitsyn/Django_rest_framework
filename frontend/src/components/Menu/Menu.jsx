import c from './Menu.module.css';
import MenuItem from "./MenuItem/MenuItem";

const Menu = ({items}, {isAuthenticated}) => {
    let ItemElements = items.map(item => <MenuItem item={item} isAuthenticated={isAuthenticated} key={item}/>)
    return(
        <nav className={c.menu}>
            <ul>
                {ItemElements}
            </ul>
        </nav>
    )
}

export default Menu;