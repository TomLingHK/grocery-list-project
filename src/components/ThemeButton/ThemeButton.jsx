import { useContext } from 'react';

import './ThemeButton.scss';
import ThemeContext from '../../context/ThemeContext';

function ThemeButton({ setTheme }) {
    const theme = useContext(ThemeContext);
    const className = "themeButton " + theme;

    return (
        <label className={ className }>
            <input
                type="checkbox"
                // checked={theme === 'dark'}
                onChange={(e) => {
                    setTheme(e.target.checked ? 'dark' : 'light')
                }}
            />
            Using {theme} mode 
        </label>
    )
}

export default ThemeButton;