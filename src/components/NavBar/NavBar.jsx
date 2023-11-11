import './NavBar.scss';
import NavButton from '../NavButton/NavButton';

function NavBar({items, handleClick}) {
    let navItems = items.nav;
    return (
        <div className="NavBar">
            {navItems.map(item => {
                return (
                    <NavButton key={ item.title } handleClick={ handleClick }>
                        { item.title }
                    </NavButton>
                )
            })}
        </div>
    )
}

export default NavBar;