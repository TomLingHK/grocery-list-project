import './NavButton.scss';

function NavButton({ children }) {
    return (
        <div className="NavButton" style={{ color: children.testing ? "red" : "green" }}>
            { children.title }
        </div>
    )
}

export default NavButton;