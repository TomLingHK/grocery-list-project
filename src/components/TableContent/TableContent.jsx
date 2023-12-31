import { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './TableContent.scss'

function TableContent({ content, rowCount, colCount, updateTableContentConfirm, discardTableContentConfirm, dataId }) {
    const theme = useContext(ThemeContext);
    const [isEditing, setIsEditing] = useState(false);
    const className = "TableContent " + theme;

    useEffect(() => {
        console.log("TableContent rendered: ");
    })

    const temp_content = content !== undefined ? JSON.parse(JSON.stringify(content)) : '';
    const orderedContent = [];
    for (let i = 0; i < rowCount; i++) {
        orderedContent.push('row' + i);
    }

    function setNewTableContent(newValue, row, col) {
        temp_content['row' + row][col] = newValue;
    }

    function onConfirmClick() {
        const callbackFunction = function() {setIsEditing(false)};
        updateTableContentConfirm(temp_content, dataId, callbackFunction);
    }

    if (content === undefined) return(<></>)

    return (
        <div className={ className }>
            
            {
                isEditing
                ?
                <>
                    <div id="EditingButton" onClick={ () => {setIsEditing(false)}}>
                        <div className="editingButton">
                            <FontAwesomeIcon className="EditButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
                        </div>
                        <div className="text">
                            Editing
                        </div>
                    </div>
                    <div id="MainContent">
                        { orderedContent.map((row, rIndex) => {
                            return (<ul key={`Row${rIndex}`} className={ row }> 
                                { content[row].map((col, cIndex) => {
                                    return <li key={`Row${rIndex}Col${cIndex}`}><input type="text" defaultValue={ col } onChange={ (e) => setNewTableContent(e.target.value, rIndex, cIndex) } /></li>
                                })}
                            </ul>)
                        })}
                    </div>
                    <div id="ActionContainer">
                        <div id="ConfirmButton">
                            <FontAwesomeIcon className="confirmButton" icon={icon({name: 'circle-check', style: 'solid'})} onClick={ onConfirmClick } />
                        </div>
                        <div id="CancelButton">
                            <FontAwesomeIcon className="cancelButton" icon={icon({name: 'circle-xmark', style: 'solid'})} />
                        </div>
                    </div>
                </>
                :
                <>
                    <div id="EditButton" onClick={ () => {setIsEditing(true)}}>
                        <div className="editButtons">
                            <FontAwesomeIcon className="EditButton_normal" icon={icon({name: 'pen-to-square', style: 'regular'})} />
                            <FontAwesomeIcon className="EditButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
                        </div>
                        <div className="text">
                            Edit
                        </div>
                    </div>
                    <div id="MainContent">
                        { orderedContent.map((row, rIndex) => {
                            return (<ul key={`Row${rIndex}`} className={ row }> 
                                { content[row].map((col, cIndex) => {
                                    return <li key={`Row${rIndex}Col${cIndex}`}> { col } </li>
                                })}
                            </ul>)
                        })}
                    </div>
                    <div id="addRowContainer">
                        <div id="AddRowButton">
                            +
                        </div>
                    </div>
                </>
            }
        </div>
    )
}

export default TableContent;