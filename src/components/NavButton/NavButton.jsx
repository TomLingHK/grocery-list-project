import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './NavButton.scss';

function NavButton({ children, index, handleClick }) {
    const isTesting = children.testing ? "isTesting" : "notTesting";

    const theme = useContext(ThemeContext);
    const className = "NavButton " + theme + " " + isTesting;

    return (
        <div className={ className }>
            <div className="NavButtonTitle" onClick={ () => { handleClick(index) }}>
                { children.title }
            </div>
            <div className="EditButtons">
                <FontAwesomeIcon className="EditButton_normal" icon={icon({name: 'pen-to-square', style: 'regular'})} />
                <FontAwesomeIcon className="EditButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
            </div>
        </div>
    )
}

export default NavButton;