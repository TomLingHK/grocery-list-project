import { useState, useEffect } from "react";
import data from "./data/data.json";

import NavBar from "./components/NavBar/NavBar";
import TableContent from "./components/TableContent/TableContent";
import ThemeButton from "./components/ThemeButton/ThemeButton";

function App() {
    const [selected, setSelected] = useState(0);
    
    useEffect(() => {
        console.log("App rendered: ");
    })

    function handleClick(children) {
        setSelected(children.index);
    }
    
    return (
        <div className="App">
            <NavBar items={data} handleClick={ handleClick }></NavBar>
            <TableContent content={ data.nav[selected].content }></TableContent>
            <ThemeButton></ThemeButton>
        </div>
    );
}

export default App;
