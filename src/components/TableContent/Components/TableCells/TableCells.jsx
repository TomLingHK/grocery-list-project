import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function TableCells({content, isEditing, tempContent, setTempContent, orderedContent, setOrderedContent, setNewTableContent, setIsShowGalleryPopup, chooseTableContentImage}) {
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
    
    function onImageBtnClick(row, col) {
        setIsShowGalleryPopup(true);
        chooseTableContentImage(row, col, setNewTableContent);
    }

    function onRemoveImageBtnClick(row, col) {
        setNewTableContent("[Image removed]", row, col);
    }

    return (
        <div className="table">
            { isEditing 
            &&
                <div className={`row removeColBtns`}>
                    <div className="cell removeRowButtons" id="emptyCell"></div>
                    { tempContent['row0'].length > 1 
                    && 
                        tempContent['row0'].map((col, cIndex) => {
                        return [
                            <div className="cell removeColButtons" key={`PreRowCol${cIndex}`}>
                                <FontAwesomeIcon className="removeColButton" onClick={() => onRemoveColClick(cIndex)} icon={icon({name: 'circle-xmark',style: 'solid'})}/>
                            </div>
                        ]})
                    }
                </div>
            }
            { isEditing 
            ? 
                <>
                    {orderedContent.map((row, rIndex) => {
                        return [
                        <div className={`row ${row}`} key={`editingRow${rIndex}TotalRow${orderedContent.length}TotalCol${tempContent['row0'].length}`}>
                            <div className="cell removeRowButtons">
                                { rIndex > 0 
                                &&
                                    <FontAwesomeIcon className="removeRowButton" onClick={() => onRemoveRowClick(rIndex)} icon={icon({name: 'circle-xmark',style: 'solid'})}/>
                                }
                            </div>
                            {tempContent[row].map((col, cIndex) => {
                                return (
                                    <div className="cell" key={`editingRow${rIndex}Col${cIndex}`}>
                                        { col.indexOf('image::') === 0 
                                        ? 
                                            <>
                                                <img width='180' height='180' alt="" src={col.replace('image::', '')} />
                                                <FontAwesomeIcon className="removeImgButton" onClick={() => onRemoveImageBtnClick(rIndex, cIndex)} icon={icon({name: 'circle-xmark',style: 'solid'})} />
                                            </> 
                                        : 
                                            <input type="text" defaultValue={col} onChange={e => setNewTableContent(e.target.value, rIndex, cIndex)} />
                                        }
                                        { rIndex > 0 
                                        && 
                                            <FontAwesomeIcon className="galleryButton" onClick={() => onImageBtnClick(rIndex, cIndex)} icon={icon({name: 'image',style: 'solid'})} /> 
                                        }
                                    </div>)
                            })}
                        </div>]
                    })}
                </> 
            : 
                <>
                    {orderedContent.map((row, rIndex) => {
                        return (
                        <div className={`row ${row}`} key={`displayRow${rIndex}`}>
                            { !!content[row] 
                            &&
                                content[row].map((col, cIndex) => {
                                    return [
                                    <div className="cell" key={`displayRow${rIndex}Col${cIndex}`}>
                                        {col.indexOf('image::') === 0 
                                        ? 
                                            <img width='180' height='180' alt="" src={col.replace('image::', '')} /> 
                                        : 
                                            <div className="cellContent">{col}</div>
                                        }
                                    </div>]
                                }) 
                            }
                        </div>)
                    })}
                </>
            }
        </div>
    )
}

export default TableCells;