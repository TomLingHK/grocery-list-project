import './NavButton.scss';

function NavButton({ children, handleClick }) {
    return (
        <div className="NavButton" onClick={() => handleClick(children)}>
            { children }
        </div>
    )
}

export default NavButton;