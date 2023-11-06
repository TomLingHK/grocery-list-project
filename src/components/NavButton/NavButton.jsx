import './NavButton.scss';

function NavButton({ children }) {
    return (
        <div className="NavButton">
            { children }
        </div>
    )
}

export default NavButton;