import './NavButton.scss';

function NavButton({ children, handleClick }) {
    return (
        <div className="NavButton" style={{ color: children.testing ? "red" : "green" }} onClick={() => handleClick(children)}>
            { children.title }
        </div>
    )
}

export default NavButton;