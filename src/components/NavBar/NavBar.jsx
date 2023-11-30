import { useEffect } from 'react';

import './NavBar.scss';
import NavButton from '../NavButton/NavButton';

function NavBar({ items, handleClick }) {
    useEffect(() => {
        console.log("NavBar rendered: ");
    })

    return (
        <div className="NavBar">
            {items.map(item => {
                return (
                    <NavButton key={ item.title } handleClick={ handleClick }>
                        { item }
                    </NavButton>
                )
            })}
            <div id="AddNavButton">
                +
            </div>
        </div>
    )
}

export default NavBar;