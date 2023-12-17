import { useEffect, useContext } from 'react';

import ThemeContext from '../../context/ThemeContext';

import './ConfirmPopup.scss';

function ConfirmPopup({ oldTitle, newTitle, onConfirm, isShowConfirmPopup, setIsShowConfirmPopup }) {
    const theme = useContext(ThemeContext);
    const className = "confirmPopupContainer " + theme;
    useEffect(() => {
        console.log("ConfirmPopup rendered: ");
    })
    
    if (!isShowConfirmPopup) return(<></>);

    return (
        <div className={ className }>
            <div className="confirmPopupBg">
            </div>
            <div className="content">
                <div className="message">
                    Are you sure to change title from { oldTitle } to { newTitle } ?
                </div>
                <div className="btnContainer">
                    <button className="confirmBtn" onClick={ onConfirm }>Confirm</button>
                    <button className="cancelBtn" onClick={ () => setIsShowConfirmPopup(false)}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmPopup;