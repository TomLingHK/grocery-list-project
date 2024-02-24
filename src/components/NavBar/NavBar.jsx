import { useEffect } from 'react';

import './NavBar.scss';
import NavButton from './Components/NavButton/NavButton';

function NavBar({ items, handleClick, setIsShowAddPopup, newTitleConfirm, deleteTitleConfirm, selected }) {
    useEffect(() => {
        console.log("NavBar rendered: ", items);
    })

    return (
        <div id="NavBar">
            {items.map((item, index) => {
                return (
                    <div key={ index } className={ item.title }>
                        <NavButton 
                            index={ index } 
                            handleClick={ handleClick } 
                            newTitleConfirm={ newTitleConfirm } 
                            deleteTitleConfirm= { deleteTitleConfirm }
                            dataId={ item.id }
                            selected={ selected }
                        >
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