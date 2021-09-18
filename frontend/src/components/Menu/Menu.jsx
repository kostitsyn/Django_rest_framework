import c from './Menu.module.css';
import MenuItem from "./MenuItem/MenuItem";

const Menu = ({items}) => {
    let ItemElements = items.map(item => <MenuItem item={item} key={item}/>)
    return(
        <nav className={c.menu}>
            <ul>
                {ItemElements}
            </ul>
        </nav>
    )
}

export default Menu;