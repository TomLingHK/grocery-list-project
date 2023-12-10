import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './NavButton.scss';

function NavButton({ children, index, handleClick }) {
    const isTesting = children.testing ? "isTesting" : "notTesting";

    const theme = useContext(ThemeContext);
    const className = "NavButton " + theme + " " + isTesting;

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(children.title);

    return (
        <div className={ className }>
            {
                isEditing
                ?
                    <input type="text" value={ title } onChange={(e) => setTitle(e.target.value)} />
                :
                <>
                    <div className="NavButtonTitle" onClick={ () => { handleClick(index) }}>
                        { children.title }
                    </div>
                    <div className="EditButtons" onClick={ () => {setIsEditing(true)}}>
                        <FontAwesomeIcon className="EditButton_normal" icon={icon({name: 'pen-to-square', style: 'regular'})} />
                        <FontAwesomeIcon className="EditButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
                    </div>
                </>
            }
            <div className="DeleteButtons">
                <FontAwesomeIcon className="DeleteButton" icon={icon({name: 'circle-xmark', style: 'solid'})} />
            </div>
        </div>
    )
}

export default NavButton;