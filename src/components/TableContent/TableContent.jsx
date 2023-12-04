import { useEffect } from "react";

import './TableContent.scss'

function TableContent({ content, rowCount, colCount }) {
    useEffect(() => {
        console.log("TableContent rendered: ");
    })

    const orderedContent = [];
    for (let i = 0; i < rowCount; i++) {
        orderedContent.push('row' + i);
    }

    if (content === undefined) return(<></>)

    return (
        <div className="TableContent">
            { orderedContent.map((row, rIndex) => {
                return (<ul key={`Row${rIndex}`} style={{ background: row==='row0' ? 'aliceblue' : ''}}> 
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