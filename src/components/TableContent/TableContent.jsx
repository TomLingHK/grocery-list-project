import { useEffect, useContext } from "react";

import ThemeContext from '../../context/ThemeContext';

import './TableContent.scss'

function TableContent({ content, rowCount, colCount }) {
    const theme = useContext(ThemeContext);
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
            { orderedContent.map((row, rIndex) => {
                return (<ul key={`Row${rIndex}`} className={ row }> 
                    { content[row].map((col, cIndex) => {
                        return <li key={`Row${rIndex}Col${cIndex}`}> { col } </li>
                    })}
                </ul>)
            })}
            <div id="addRowContainer">
                <div id="AddRowButton">
                    +
                </div>
            </div>
        </div>
    )
}

export default TableContent;