import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from "../../../../context/ThemeContext";

import './NavButton.scss';

function NavButton({ children, index, onNavBtnClick, newTitleConfirm, deleteTitleConfirm, dataId, selected }) {
    const isTesting = children.testing ? "isTesting" : "notTesting";
    const isSelected = index === selected ? "active" : "inactive";

    const theme = useContext(ThemeContext);
    const className = "navButton " + theme + " " + isTesting + " " + isSelected;

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(children.title);

    function onTickClick() {
        if (newTitle !== children.title) {
            const callbackFunction = function() {setIsEditing(false)};
            newTitleConfirm(children.title, newTitle, dataId, callbackFunction);
        }
        else setIsEditing(false)
    }

    function onDeleteClick() {
        deleteTitleConfirm(children.title, dataId);
    }

    if (isEditing)
        setTimeout(() => document.getElementById("titleInput").focus(), 0);
    else if (newTitle !== children.title)
        setNewTitle(children.title);

    return (
        <div className={ className }>
            {
                isEditing
                ?
                <>
                    <input id="titleInput" type="text" value={ newTitle } onChange={(e) => setNewTitle(e.target.value)} />
                    <FontAwesomeIcon className="tickButton" icon={icon({name: 'circle-check', style: 'solid'})} onClick={ onTickClick } />
                </>
                :
                <>
                    <div className="navButtonTitle" onClick={ () => { onNavBtnClick(index) }}>
                        { children.title }
                    </div>
                    <div className="editButtons" onClick={ () => {setIsEditing(true)}}>
                        <FontAwesomeIcon className="editButton_normal" icon={icon({name: 'pen-to-square', style: 'regular'})} />
                        <FontAwesomeIcon className="editButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
                    </div>
                    <div className="deleteButtons" onClick={ onDeleteClick }>
                        <FontAwesomeIcon className="deleteButton" icon={icon({name: 'circle-xmark', style: 'solid'})} />
                    </div>
                </>
            }
        </div>
    )
}

export default NavButton;