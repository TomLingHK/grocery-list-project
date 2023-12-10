import { useEffect } from 'react';

import './NavBar.scss';
import NavButton from '../NavButton/NavButton';

function NavBar({ items, handleClick, setIsShowAddPopup }) {
    useEffect(() => {
        console.log("NavBar rendered: ");
    })

    return (
        <div className="NavBar">
            {items.map((item, index) => {
                return (
                    <div key={ index } className={ item.title }>
                        <NavButton index={ index } handleClick={ handleClick } >
                            { item }
                        </NavButton>
                    </div>
                )
            })}
            <div id="AddNavButton" onClick={ () => setIsShowAddPopup(true) }>
                +
            </div>
        </div>
    )
}

export default NavBar;