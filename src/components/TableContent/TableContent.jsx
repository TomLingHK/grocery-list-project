import { useEffect, useContext, useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './TableContent.scss'

function TableContent({ content, rowCount, colCount, updateTableContentConfirm, discardTableContentConfirm, dataId, setIsShowGalleryPopup, chooseTableContentImage }) {
    const theme = useContext(ThemeContext);
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState([]);
    const [orderedContent, setOrderedContent] = useState([]);

    const tableRef = useRef(null);

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
        setIsEditing(false);
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
        if (row === undefined || col === undefined) {
            console.error("[Function setNewTableContent] Missing row or col!");
            return;
        }
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
            const callbackFunction = function() {setIsEditing(false); resetTempData();};
            updateTableContentConfirm(tempContent, dataId, callbackFunction);
        }
        else {
            setIsEditing(false);
        }
    }

    function onCancelClick() {
        const contentChanged = !shallowEqual(content, tempContent);
        if (contentChanged) {
            const callbackFunction = function() {setIsEditing(false); resetTempData();};
            discardTableContentConfirm(callbackFunction);
        }
        else {
            setIsEditing(false);
        }
    }

    function onEnterEditModeClick() {
        if (isEditing) return;
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
        
        setTimeout(() => {
            if (tableRef.current) {
                tableRef.current.scrollTop = tableRef.current.scrollHeight;
            }
        }, 0);
    }

    function onAddColClick() {
        const newTempContent = JSON.parse(JSON.stringify(tempContent));
        
        Object.keys(newTempContent).forEach(key => {
            newTempContent[key].push('New Col');
        })

        setTempContent(newTempContent);
        
        setTimeout(() => {
            if (tableRef.current) {
                tableRef.current.scrollLeft = tableRef.current.scrollWidth;
            }
        }, 0);
    }

    function onImageBtnClick(row, col) {
        setIsShowGalleryPopup(true);
        chooseTableContentImage(row, col, setNewTableContent);
    }

    function onRemoveImageBtnClick(row, col) {
        setNewTableContent("[Image removed]", row, col);
    }

    function onRemoveRowClick(row) {
        const rowCount = Object.keys(tempContent).length;
        const newTempContent = JSON.parse(JSON.stringify({...tempContent}));
        const newOrderedContent = JSON.parse(JSON.stringify([...orderedContent]));
        newOrderedContent.splice(newOrderedContent.length - 1, 1);
        
        setOrderedContent([...newOrderedContent]);

        delete newTempContent['row' + row];

        if (row < rowCount - 1) {
            for (let i = row; i < rowCount - 1; i++ ) {
                const nextRowIndex = i + 1;
                newTempContent['row' + i] = JSON.parse(JSON.stringify(newTempContent['row' + nextRowIndex]));
                delete newTempContent['row' + nextRowIndex];
            }
        }

        setTempContent(newTempContent);
    }

    function onRemoveColClick(col) {
        const newTempContent = JSON.parse(JSON.stringify({...tempContent}));

        Object.keys(newTempContent).forEach( key => {
            newTempContent[key].splice(col, 1);
        })

        setTempContent(newTempContent);
    }

    if (content === undefined) return(<></>)

    return (
        <div className={ className }>
            <div id="EditButton" onClick={onEnterEditModeClick}>
                {isEditing 
                ? 
                    <FontAwesomeIcon icon={icon({name: 'pen-to-square', style: 'solid'})} />
                :
                    <>
                        <FontAwesomeIcon className="editButton_normal" icon={icon({name: 'pen-to-square', style: 'regular'})} />
                        <FontAwesomeIcon className="editButton_hover" icon={icon({name: 'pen-to-square', style: 'solid'})} />
                    </>
                }
                <div className="text">{isEditing ? 'Editing' : 'Edit'}</div>
            </div>
            {isEditing && 
                <div id="AddColContainer">
                    <div id="AddColButton" onClick={onAddColClick}>
                        +
                    </div>
                </div>
            }
            <div id="MainContent" ref={ tableRef }>
                <div className="table">
                    {isEditing
                    ?
                        <>
                            <div className={`row removeColBtns`}> 
                                <div className="cell removeRowButtons" id="emptyCell"></div>
                                { tempContent['row0'].length > 1 
                                ?
                                    ( tempContent['row0'].map((col, cIndex) => {
                                        return ([
                                            <div key={`PreRowCol${cIndex}`} className="cell removeColButtons"> 
                                                <FontAwesomeIcon 
                                                    className="removeColButton" 
                                                    onClick={() => onRemoveColClick(cIndex)}
                                                    icon={icon({name: 'circle-xmark', style: 'solid'})} 
                                                />
                                            </div>
                                        ])
                                    })) 
                                : <></>
                                }
                            </div>
                            { orderedContent.map((row, rIndex) => {
                            return (
                                <div key={`editingRow${rIndex}TotalRow${orderedContent.length}TotalCol${tempContent['row0'].length}`} className={`row ${row}`}> 
                                    <div className="cell removeRowButtons"> 
                                        { rIndex > 0 
                                        ?
                                            <FontAwesomeIcon 
                                                className="removeRowButton" 
                                                onClick={() => onRemoveRowClick(rIndex)}
                                                icon={icon({name: 'circle-xmark', style: 'solid'})} 
                                            /> 
                                        : <></>
                                        }
                                    </div>
                                    { tempContent[row].map((col, cIndex) => {
                                        return ([
                                            <div key={`editingRow${rIndex}Col${cIndex}`} className="cell"> 
                                                {col.indexOf('image::') === 0
                                                ?
                                                    <>
                                                        <img width='180' height='180' alt="" src={col.replace('image::', '')} />
                                                        <FontAwesomeIcon 
                                                            className="removeImgButton" 
                                                            onClick={() => onRemoveImageBtnClick(rIndex, cIndex)}
                                                            icon={icon({name: 'circle-xmark', style: 'solid'})} 
                                                        />
                                                    </>
                                                :
                                                    <input type="text" defaultValue={ col } onChange={ (e) => setNewTableContent(e.target.value, rIndex, cIndex) } />
                                                }
                                                {rIndex > 0 
                                                ?
                                                    <FontAwesomeIcon 
                                                        className="galleryButton" 
                                                        onClick={() => onImageBtnClick(rIndex, cIndex)}
                                                        icon={icon({name: 'image', style: 'solid'})} 
                                                    />
                                                : ''
                                                }
                                            </div>])
                                    })}
                                </div>)
                            })}
                        </>
                    :
                        <>
                            { orderedContent.map((row, rIndex) => {
                            return (
                                <div key={`displayRow${rIndex}`} className={`row ${row}`}> 
                                    {!!content[row] 
                                    ?
                                        content[row].map((col, cIndex) => {
                                            return ([
                                                <div key={`displayRow${rIndex}Col${cIndex}`} className="cell"> 
                                                    {col.indexOf('image::') === 0 ?
                                                        <img width='180' height='180' alt="" src={col.replace('image::', '')} />
                                                    :
                                                        <div className="cellContent">{ col }</div>
                                                    }
                                                </div>
                                            ])
                                        }) 
                                    : ""
                                    }
                                </div>)
                            })}
                        </>
                    }
                </div>
            </div>
            {isEditing &&
            <>
                <div id="AddRowContainer">
                    <div id="AddRowButton" onClick={onAddRowClick}>
                        +
                    </div>
                </div>
                <div id="ActionContainer">
                    <FontAwesomeIcon className="confirmButton" icon={icon({name: 'circle-check', style: 'solid'})} onClick={ onConfirmClick } />
                    <FontAwesomeIcon className="cancelButton" icon={icon({name: 'circle-xmark', style: 'solid'})} onClick={ onCancelClick }/>
                </div>
            </>
            }
        </div>
    )
}

export default TableContent;