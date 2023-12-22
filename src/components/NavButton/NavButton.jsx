import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './NavButton.scss';

function NavButton({ children, index, handleClick, newTitleConfirm, deleteTitleConfirm, dataId }) {
    const isTesting = children.testing ? "isTesting" : "notTesting";

    const theme = useContext(ThemeContext);
    const className = "NavButton " + theme + " " + isTesting;

    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(children.title);

    function onTickClick() {
        if (newTitle !== children.title) {
            newTitleConfirm(children.title, newTitle, dataId);
            setIsEditing(false);
        }
        else setIsEditing(false)
    }

    function onDeleteClick() {
console.warn('onDeleteClick');
        deleteTitleConfirm(children.title, dataId);
        setIsEditing(false);
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
                    <FontAwesomeIcon className="TickButton" icon={icon({name: 'circle-check', style: 'solid'})} onClick={ onTickClick } />
                </>
                :
                <>
                    <div className="NavButtonTitle" onClick={ () => { handleClick(index) }}>
                        { children.title }
                    </div>
                    <div className="EditButtons" onClick={ () => {setIsEditing(true)}}>
                        <FontAwesomeIcon className="EditButton_normal" icon={icon({name: 'pen-to-square', style: 'regular'})} />
                        <FontAwesomeIcon className="EditButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
                    </div>
                </>
            }
            <div className="DeleteButtons" onClick={ onDeleteClick }>
                <FontAwesomeIcon className="DeleteButton" icon={icon({name: 'circle-xmark', style: 'solid'})} />
            </div>
        </div>
    )
}

export default NavButton;