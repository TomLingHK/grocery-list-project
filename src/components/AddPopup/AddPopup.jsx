import './AddPopup.scss'

function AddPopup({setNewNavTitle, setNewNavIsTesting, newNavIsTesting, onSubmitNav, isShowAddPopup}) {
    if (!isShowAddPopup) return(<></>);

    return (
        <div className="addPopupContainer">
            <div className="addPopupBg">
            </div>
            <div className="addPopupInputSection">
                <input 
                    placeholder="Title..." 
                    onChange={(e) => setNewNavTitle(e.target.value)}
                />
                <input 
                    type="checkbox" 
                    checked={newNavIsTesting} 
                    onChange={(e) => setNewNavIsTesting(e.target.checked)}
                />
                <label>Is Testing</label>
                <button onClick={onSubmitNav}>Add New Nav</button>
            </div>
        </div>
    )
}

export default AddPopup;