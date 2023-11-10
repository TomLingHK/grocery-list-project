import './NavButton.scss';

function NavButton({ children }) {
    function handleClick() {
      console.log('Clicked: ', children)
    }

    return (
        <div className="NavButton" onClick={handleClick}>
            { children }
        </div>
    )
}

export default NavButton;