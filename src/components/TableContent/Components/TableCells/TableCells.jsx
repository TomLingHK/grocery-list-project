import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function TableCells({content, isEditing, tempContent, orderedContent, onRemoveColClick, onRemoveRowClick, onRemoveImageBtnClick, setNewTableContent, onImageBtnClick}) {
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