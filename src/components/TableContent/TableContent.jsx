import { useEffect } from "react";

import './TableContent.scss'

function TableContent({ content }) {
    useEffect(() => {
        console.log("TableContent rendered: ");
    })

    return (
        <div className="TableContent">
            { content.map((row, rIndex) => {
                return (<ul> 
                    { row.map((col, cIndex) => {
                        return <li key={`Row${rIndex}Col${cIndex}`}> { col } </li>
                    })}
                </ul>)
            })}
        </div>
    )
}

export default TableContent;