import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

function TableCell({isEditing, col, rIndex, cIndex, onRemoveImageBtnClick, setNewTableContent, onImageBtnClick}) {

    return (
        <div className="tableCell">
            { isEditing
            ?
            <>
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
            </>
            :
                <>
                    {col.indexOf('image::') === 0 
                    ? 
                        <img width='180' height='180' alt="" src={col.replace('image::', '')} /> 
                    : 
                        <div className="cellContent">{col}</div>
                    }
                </>
            }
        </div>
    )
}

export default TableCell;