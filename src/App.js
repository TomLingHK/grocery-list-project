import { useState, useEffect } from "react";
import { db } from "./config/firebase-config";
import { getDocs, collection, addDoc, Timestamp, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

import ThemeContext from "./context/ThemeContext";

import './App.scss';

import NavBar from "./components/NavBar/NavBar";
import TableContent from "./components/TableContent/TableContent";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import Authentication from "./components/Authentication/Authentication";
import AddPopup from "./components/AddPopup/AddPopup";
import ConfirmPopup from "./components/ConfirmPopup/ConfirmPopup";

function App() {
    const [selected, setSelected] = useState(0);
    const [theme, setTheme] = useState('light');
    const [navList, setNavList] = useState([]);
    const [isShowAddPopup, setIsShowAddPopup] = useState(false);
    const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
    const [confirmPopupConfirmFunction, setConfirmPopupConfirmFunction] = useState(() => {});

    const [newTitle, setNewTitle] = useState('');
    const [curDataId , setCurDataId] = useState('');
    const [message, setMessage] = useState('');

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
                },
                rowCount: 2,
                colCount: 3,
            });
            
            setIsShowAddPopup(false);
            getNavList();
        } catch (error) {
            console.error(error);
        }
    };

    const updateNavBtnTitle = async () => {
        const navBarDoc = doc(db, "navBar", curDataId);
        await updateDoc(navBarDoc, {title: newTitle});

        resetConfirmPopupData();
        getNavList();

        function resetConfirmPopupData() {
            setNewTitle('');
            setIsShowConfirmPopup(false);
            setCurDataId('');
            setConfirmPopupConfirmFunction(() => {});
        }
    }

    const deleteNavBtn = async () => {
        const navBarDoc = doc(db, "navBar", curDataId);
        await deleteDoc(navBarDoc);
        
        resetConfirmPopupData();
        getNavList();
        
        function resetConfirmPopupData() {
            setIsShowConfirmPopup(false);
            setCurDataId('');
            setConfirmPopupConfirmFunction(() => {});
        }
    }

    function handleClick(index) {
        setSelected(index);
    }

    function newTitleConfirm(oldTitle, newTitle, dataId) {
        setIsShowConfirmPopup(true);
        setCurDataId(dataId);

        let text =" Are you sure to change title from { oldTitle } to { newTitle } ?" ;
        text = text.replace('{ oldTitle }', oldTitle);
        text = text.replace('{ newTitle }', newTitle);
        setMessage(text);
        setNewTitle(newTitle);
        setConfirmPopupConfirmFunction(() => updateNavBtnTitle);
    }

    function deleteTitleConfirm(title, dataId) {
        setCurDataId(dataId);
        setIsShowConfirmPopup(true);

        let text =" Are you sure to delete all data of { title } ?" ;
        text = text.replace('{ title }', title);
        setMessage(text);
        setConfirmPopupConfirmFunction(() => deleteNavBtn);
    }
    
    return (
        <ThemeContext.Provider value={theme}>
            <div className={ className }>
                <div className="pageContainer">
                    <NavBar 
                        items={navList} 
                        handleClick={ handleClick } 
                        setIsShowAddPopup={ setIsShowAddPopup }
                        newTitleConfirm = { newTitleConfirm }
                        deleteTitleConfirm = { deleteTitleConfirm }
                    ></NavBar>
                    <TableContent content={ navList[selected]?.tableContent } rowCount = { navList[selected]?.rowCount } colCount = { navList[selected]?.colCount }></TableContent>
                    <ThemeButton setTheme={ setTheme }></ThemeButton>
                    <Authentication/>
                </div>
                <AddPopup 
                    setNewNavTitle={setNewNavTitle} 
                    setNewNavIsTesting={setNewNavIsTesting} 
                    newNavIsTesting={newNavIsTesting} 
                    onSubmitNav={onSubmitNav}
                    isShowAddPopup={isShowAddPopup}
                    setIsShowAddPopup={setIsShowAddPopup}
                ></AddPopup>
                <ConfirmPopup
                    message={message}
                    onConfirm={confirmPopupConfirmFunction}
                    isShowConfirmPopup={isShowConfirmPopup}
                    setIsShowConfirmPopup={setIsShowConfirmPopup}
                ></ConfirmPopup>
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
