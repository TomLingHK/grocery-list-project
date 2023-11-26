import { useState, useEffect } from "react";
import data from "./data/data.json";
import { db } from "./config/firebase-config";
import { getDocs, collection } from "firebase/firestore";

import ThemeContext from "./context/ThemeContext";

import NavBar from "./components/NavBar/NavBar";
import TableContent from "./components/TableContent/TableContent";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import Authentication from "./components/Authentication/Authentication";

function App() {
    const [selected, setSelected] = useState(0);
    const [theme, setTheme] = useState('light');
    const [navList, setNavList] = useState([]);

    const navListCollectionRef = collection(db, "navBar");

    const className = "App " + theme;
    
    useEffect(() => {
        const getNavList = async () => {
            try {
                const data = await getDocs(navListCollectionRef);
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data(),
                    id: doc.id,
                }))
                setNavList(filteredData);
            } catch (error) {
                console.error(error);
            }
        }

        console.log("App rendered: ");
        getNavList();
    }, [])

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
                {navList.map((nav) => (
                    <div>
                        <h1 style={{ color: nav.testing ? "red" : "green" }}>{ nav.title }</h1>
                        <p>{ nav.index }</p>
                    </div>
                ))}
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
