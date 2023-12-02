import { useState, useEffect } from "react";
import { db } from "./config/firebase-config";
import { getDocs, collection, addDoc, Timestamp, query, orderBy } from "firebase/firestore";

import ThemeContext from "./context/ThemeContext";

import NavBar from "./components/NavBar/NavBar";
import TableContent from "./components/TableContent/TableContent";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import Authentication from "./components/Authentication/Authentication";
import AddPopup from "./components/AddPopup/AddPopup";

function App() {
    const [selected, setSelected] = useState(0);
    const [theme, setTheme] = useState('light');
    const [navList, setNavList] = useState([]);
    const [isShowAddPopup, setIsShowAddPopup] = useState(false);

    // New Nav States
    const [newNavTitle, setNewNavTitle] = useState("");
    const [newNavIsTesting, setNewNavIsTesting] = useState(false);

    const navListCollectionRef = collection(db, "navBar");

    const className = "App " + theme;
    
    
    const getNavList = async () => {
        try {
            const orderedQuery = query(navListCollectionRef, orderBy("createdAt"));
            const querySnapshot = await getDocs(orderedQuery);

            const filteredData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            setNavList(filteredData);
            console.warn(filteredData)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log("App rendered: ");
        getNavList();
    }, []);

    const onSubmitNav = async () => {
        try {
            await addDoc(navListCollectionRef, {
                title: newNavTitle,
                testing: newNavIsTesting,
                createdAt: Timestamp.fromDate(new Date()),
                tableContent: {
                    row0: ["Test1", "Test2", "Test3"],
                    row1: ["Test4", "Test5", "Test6"],
                }
            });
            
            getNavList();
        } catch (error) {
            console.error(error);
        }

    };

    function handleClick(children) {
        setSelected(children.index);
    }

    function handleAddNewNavClick() {
        setIsShowAddPopup(true);
    }
    
    return (
        <ThemeContext.Provider value={theme}>
            <div className={ className }>
                <NavBar items={navList} handleClick={ handleClick } handleAddNewNavClick={ handleAddNewNavClick }></NavBar>
                <TableContent content={ navList[selected]?.tableContent }></TableContent>
                <ThemeButton setTheme={ setTheme }></ThemeButton>
                <Authentication/>
                <AddPopup 
                    setNewNavTitle={setNewNavTitle} 
                    setNewNavIsTesting={setNewNavIsTesting} 
                    newNavIsTesting={newNavIsTesting} 
                    onSubmitNav={onSubmitNav}
                    isShowAddPopup={isShowAddPopup}
                ></AddPopup>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
