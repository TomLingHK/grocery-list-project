import { useEffect, useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './TableContent.scss'

function TableContent({ content, rowCount, colCount }) {
    const theme = useContext(ThemeContext);
    const [isEditing, setIsEditing] = useState(false);
    const className = "TableContent " + theme;

    useEffect(() => {
        console.log("TableContent rendered: ");
    })

    const orderedContent = [];
    for (let i = 0; i < rowCount; i++) {
        orderedContent.push('row' + i);
    }

    if (content === undefined) return(<></>)

    return (
        <div className={ className }>
            
            {
                isEditing
                ?
                    <div id="MainContent">
                        { orderedContent.map((row, rIndex) => {
                            return (<ul key={`Row${rIndex}`} className={ row }> 
                                { content[row].map((col, cIndex) => {
                                    return <li key={`Row${rIndex}Col${cIndex}`}><input type="text" value={ col } /></li>
                                })}
                            </ul>)
                        })}
                    </div>
                :
                <>
                    <div id="EditButton" onClick={ () => {setIsEditing(true)}}>
                        <div className="EditButtons">
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