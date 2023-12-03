import './AddPopup.scss'

function AddPopup({setNewNavTitle, setNewNavIsTesting, newNavIsTesting, onSubmitNav, isShowAddPopup, setIsShowAddPopup}) {
    if (!isShowAddPopup) return(<></>);

    return (
        <div className="addPopupContainer">
            <div className="addPopupBg">
            </div>
            <div className="addPopupInputSection">
                <div className="titleInputContaienr">
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