import { useEffect } from "react";

function TableContent({ content }) {
    useEffect(() => {
        console.log("TableContent rendered: ");
    })

    return (
        <div className="TableContent">
            { content }
        </div>
    )
}

export default TableContent;