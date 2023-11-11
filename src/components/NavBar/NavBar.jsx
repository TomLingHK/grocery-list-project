import { useEffect } from 'react';

import './NavBar.scss';
import NavButton from '../NavButton/NavButton';

function NavBar({ items, handleClick }) {
    let navItems = items.nav;
    
    useEffect(() => {
        console.log("NavBar rendered: ");
    })

    return (
        <div className="NavBar">
            {navItems.map(item => {
                return (
                    <NavButton key={ item.title } handleClick={ handleClick }>
                        { item }
                    </NavButton>
                )
            })}
        </div>
    )
}

export default NavBar;