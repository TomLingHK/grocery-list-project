import { useContext } from "react";

import ThemeContext from '../../context/ThemeContext';

import './AddPopup.scss'

function AddPopup({setNewNavTitle, setNewNavIsTesting, newNavIsTesting, onSubmitNav, setIsShowAddPopup}) {
    const theme = useContext(ThemeContext);
    const className = "addPopupContainer " + theme;

    return (
        <div className={ className }>
            <div className="addPopupBg">
            </div>
            <div className="addPopupInputSection">
                <div className="titleInputContainer">
                    <input 
                        placeholder="Title..." 
                        onChange={(e) => setNewNavTitle(e.target.value)}
                    />
                </div>
                <div className="isTestingInputContainer">
                    <input 
                        type="checkbox" 
                        checked={newNavIsTesting} 
                        onChange={(e) => setNewNavIsTesting(e.target.checked)}
                    />
                    <label>Is Testing</label>
                </div>
                <div className="btnContainer">
                    <button className="addNewNavBtn" onClick={onSubmitNav}>Add New Nav</button>
                    <button className="cancelBtn" onClick={ () => setIsShowAddPopup(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default AddPopup;