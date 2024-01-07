import { useEffect, useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './TableContent.scss'

function TableContent({ content, rowCount, colCount, updateTableContentConfirm, discardTableContentConfirm, dataId }) {
    const theme = useContext(ThemeContext);
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState([]);
    const [orderedContent, setOrderedContent] = useState([]);

    const editingClass = isEditing ? ' editMode' : '';
    const className = "tableContent " + theme + editingClass;

    useEffect(() => {
        console.log("TableContent rendered: ");
    })

    useEffect(() => {
        setTempContent(content !== undefined ? JSON.parse(JSON.stringify(content)) : '');
        const orderArr = [];
        for (let i = 0; i < rowCount; i++) {
            orderArr.push('row' + i);
        }
        setOrderedContent(orderArr);
    }, [content])

    function resetTempData() {
        setTempContent(content !== undefined ? JSON.parse(JSON.stringify(content)) : '');
        const orderArr = [];
        for (let i = 0; i < rowCount; i++) {
            orderArr.push('row' + i);
        }
        setOrderedContent(orderArr);
    }

    function shallowEqual(object1, object2) {
        const keys1 = Object.keys(object1);
        const keys2 = Object.keys(object2);
      
        if (keys1.length !== keys2.length) {
            return false;
        }
      
        for (let key of keys1) {
            if (JSON.stringify(object1[key]) !== JSON.stringify(object2[key])) {
                return false;
            }
        }
      
        return true;
    }

    function setNewTableContent(newValue, row, col) {
        const curRow = 'row' + row;
        const curRowContent = [...tempContent[curRow]];

        curRowContent[col] = newValue;

        setTempContent((tempContent)=>({
            ...tempContent, 
            [curRow]: [...curRowContent]
        }))
    }

    function onConfirmClick() {
        const contentChanged = !shallowEqual(content, tempContent);
        if (contentChanged) {
            const callbackFunction = function() {setIsEditing(false)};
            updateTableContentConfirm(tempContent, dataId, callbackFunction);
            resetTempData();
        }
        else {
            setIsEditing(false);
        }
    }

    function onCancelClick() {
        const contentChanged = !shallowEqual(content, tempContent);
        if (contentChanged) {
            const callbackFunction = function() {setIsEditing(false)};
            discardTableContentConfirm(callbackFunction);
            resetTempData();
        }
        else {
            setIsEditing(false);
        }
    }

    function onEnterEditModeClick() {
        setIsEditing(true)
        setTempContent(content !== undefined ? JSON.parse(JSON.stringify(content)) : '');
    }

    function onAddRowClick() {
        const colCount = tempContent.row0.length;
        const newRowCount = Object.keys(tempContent).length;
        const newRowContent = [];

        const newRowString = 'row' + newRowCount;
        setOrderedContent([...orderedContent, newRowString]);
        
        for (let i = 0; i < colCount; i++) {
            newRowContent.push('New Row');
        }

        setTempContent( tempContent => ({
            ...tempContent, 
            [`row${newRowCount}`]: newRowContent
        }))
    }

    function onAddColClick() {

    }

    if (content === undefined) return(<></>)

    return (
        <div className={ className }>
            
            {
                isEditing
                ?
                <>
                    <div id="EditingButton">
                        <div className="editingButton">
                            <FontAwesomeIcon className="EditButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
                        </div>
                        <div className="text">
                            Editing
                        </div>
                    </div>
                    <div id="AddColContainer">
                        <div id="AddColButton" onClick={onAddColClick}>
                            +
                        </div>
                    </div>
                    <div id="MainContent">
                        { orderedContent.map((row, rIndex) => {
                            return (<ul key={`Row${rIndex}`} className={ row }> 
                                { tempContent[row].map((col, cIndex) => {
                                    return <li key={`Row${rIndex}Col${cIndex}`}><input type="text" defaultValue={ col } onChange={ (e) => setNewTableContent(e.target.value, rIndex, cIndex) } /></li>
                                })}
                            </ul>)
                        })}
                    </div>
                    <div id="AddRowContainer">
                        <div id="AddRowButton" onClick={onAddRowClick}>
                            +
                        </div>
                    </div>
                    <div id="ActionContainer">
                        <div id="ConfirmButton">
                            <FontAwesomeIcon className="confirmButton" icon={icon({name: 'circle-check', style: 'solid'})} onClick={ onConfirmClick } />
                        </div>
                        <div id="CancelButton">
                            <FontAwesomeIcon className="cancelButton" icon={icon({name: 'circle-xmark', style: 'solid'})} onClick={ onCancelClick }/>
                        </div>
                    </div>
                </>
                :
                <>
                    <div id="EditButton" onClick={onEnterEditModeClick}>
                        <div className="editButtons">
                            <FontAwesomeIcon className="editButton_normal" icon={icon({name: 'pen-to-square', style: 'regular'})} />
                            <FontAwesomeIcon className="editButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
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
                </>
            }
        </div>
    )
}

export default TableContent;