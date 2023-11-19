import './ThemeButton.scss';

function ThemeButton() {
    return (
        <label id="themeButton">
            <input
                type="checkbox"
                // checked={theme === 'dark'}
                // onChange={(e) => {
                //     setTheme(e.target.checked ? 'dark' : 'light')
                // }}
            />
            Use dark mode
        </label>
    )
}

export default ThemeButton;