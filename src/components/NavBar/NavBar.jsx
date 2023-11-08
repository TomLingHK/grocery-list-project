import './NavBar.scss';
import NavButton from '../NavButton/NavButton';

function NavBar({items}) {
    let navItems = items.nav;
    return (
        <div className="NavBar">
            {navItems.map(item => {
               return <NavButton key={ item }>{ item }</NavButton> 
            })}
        </div>
    )
}

export default NavBar;