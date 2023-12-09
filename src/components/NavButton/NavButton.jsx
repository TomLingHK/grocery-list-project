import { useContext } from "react";

import ThemeContext from '../../context/ThemeContext';

import './NavButton.scss';

function NavButton({ children }) {
    const isTesting = children.testing ? "isTesting" : "notTesting";

    const theme = useContext(ThemeContext);
    const className = "NavButton " + theme + " " + isTesting;

    return (
        <div className={ className }>
            { children.title }
        </div>
    )
}

export default NavButton;