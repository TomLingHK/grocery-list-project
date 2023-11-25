import { useState, useEffect } from "react";
import data from "./data/data.json";

import ThemeContext from "./context/ThemeContext";

import NavBar from "./components/NavBar/NavBar";
import TableContent from "./components/TableContent/TableContent";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import Authentication from "./components/Authentication/Authentication";

function App() {
    const [selected, setSelected] = useState(0);
    const [theme, setTheme] = useState('light');
    const className = "App " + theme;
    
    useEffect(() => {
        console.log("App rendered: ");
    })

    function handleClick(children) {
        setSelected(children.index);
    }
    
    return (
        <ThemeContext.Provider value={theme}>
            <div className={ className }>
                <NavBar items={data} handleClick={ handleClick }></NavBar>
                <TableContent content={ data.nav[selected].content }></TableContent>
                <ThemeButton setTheme={ setTheme }></ThemeButton>
                <Authentication/>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
