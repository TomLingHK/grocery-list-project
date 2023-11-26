import { useEffect } from "react";

import './TableContent.scss'

function TableContent({ content }) {
    useEffect(() => {
        console.log("TableContent rendered: ");
    })

    return (
        <div className="TableContent">
            { content.map((row, rIndex) => {
                return (<ul key={`Row${rIndex}`}> 
                    { row.map((col, cIndex) => {
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