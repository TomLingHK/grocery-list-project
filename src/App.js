import { useState, useEffect } from "react";
import { db, storage } from "./config/firebase-config";
import { getDocs, collection, addDoc, Timestamp, query, orderBy, doc, updateDoc, deleteDoc } from "firebase/firestore";

import ThemeContext from "./context/ThemeContext";

import './App.scss';

import NavBar from "./components/NavBar/NavBar";
import TableContent from "./components/TableContent/TableContent";
import ThemeButton from "./components/ThemeButton/ThemeButton";
import Authentication from "./components/Authentication/Authentication";
import AddPopup from "./components/AddPopup/AddPopup";
import ConfirmPopup from "./components/ConfirmPopup/ConfirmPopup";
import UploadImage from "./components/UploadImage/UploadImage";
import GalleryPopup from "./components/GalleryPopup/GalleryPopup";
import { listAll, ref, uploadBytes, getDownloadURL } from "firebase/storage";

function App() {
    const [selected, setSelected] = useState(0);
    const [theme, setTheme] = useState('dark');
    const [navList, setNavList] = useState([]);
    const [isShowAddPopup, setIsShowAddPopup] = useState(false);
    const [isShowConfirmPopup, setIsShowConfirmPopup] = useState(false);
    const [confirmPopupConfirmFunction, setConfirmPopupConfirmFunction] = useState(() => {});

    // Confirm Popup States
    const [message, setMessage] = useState('');

    // New Nav States
    const [newNavTitle, setNewNavTitle] = useState("");
    const [newNavIsTesting, setNewNavIsTesting] = useState(false);

    const navListCollectionRef = collection(db, "navBar");

    const [imageUpload, setImageUpload] = useState(null);
    const [imageList, setImageList] = useState([]);
    const [isShowGalleryPopup, setIsShowGalleryPopup] = useState(false);
    const [curTableContentRow, setCurTableContentRow] = useState(0);
    const [curTableContentCol, setCurTableContentCol] = useState(0);
    const [updateTableContentImageFunction, setUpdateTableContentImageFunction] = useState(() => {});

    const imageListRef = ref(storage, "images/");

    const className = "App " + theme;
    
    
    const getNavList = async () => {
        try {
            const orderedQuery = query(navListCollectionRef, orderBy("createdAt"));
            const querySnapshot = await getDocs(orderedQuery);

            const filteredData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
            }));

            if (filteredData[selected] === undefined) setSelected(0);
            setNavList(filteredData);
        } catch (error) {
            console.error(error);
        }
    }

    const getGalleryImages = async () => {
        try {
            let tempImageList = [];
            const response = await listAll(imageListRef);
            if (response.items.length === 0) return;

            for (const item of response.items) {
                const url = await getDownloadURL(item);
                tempImageList.push(url);
            }

            setImageList(tempImageList);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        console.log("App rendered: ");
        getNavList();
        getGalleryImages();
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

    const updateNavBtnTitle = async (dataId, newTitle) => {
        const navBarDoc = doc(db, "navBar", dataId);
        await updateDoc(navBarDoc, {title: newTitle});

        resetConfirmPopupData();
        getNavList();

        function resetConfirmPopupData() {
            setIsShowConfirmPopup(false);
            setConfirmPopupConfirmFunction(() => {});
        }
    }

    const deleteNavBtn = async (dataId) => {
        const navBarDoc = doc(db, "navBar", dataId);
        await deleteDoc(navBarDoc);
        
        resetConfirmPopupData();
        getNavList();
        
        function resetConfirmPopupData() {
            setIsShowConfirmPopup(false);
            setConfirmPopupConfirmFunction(() => {});
        }
    }

    const updateTableContent = async (dataId, newTableContent) => {
        const navBarDoc = doc(db, "navBar", dataId);
        const newRowCount = Object.keys(newTableContent).length;
        const newColCount = newTableContent.row0.length;
        await updateDoc(navBarDoc, {
            tableContent: newTableContent,
            rowCount: newRowCount,
            colCount: newColCount
        });
        
        resetConfirmPopupData();
        getNavList();
        
        function resetConfirmPopupData() {
            setIsShowConfirmPopup(false);
        }
    }

    const uploadFile = async () => {
        if (!imageUpload) return;

        const filesFolderRef = ref(storage, `images/${imageUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, imageUpload);
        } catch (error) {
            console.error(error);
        }
    }

    function handleClick(index) {
        setSelected(index);
    }

    function newTitleConfirm(oldTitle, newTitle, dataId, callbackFunction) {
        setIsShowConfirmPopup(true);

        let text =" Are you sure to change title from { oldTitle } to { newTitle } ?" ;
        text = text.replace('{ oldTitle }', oldTitle);
        text = text.replace('{ newTitle }', newTitle);
        setMessage(text);
        setConfirmPopupConfirmFunction(() => {
            return () => {
                updateNavBtnTitle(dataId, newTitle)
                callbackFunction();
            };
        });
    }

    function deleteTitleConfirm(title, dataId) {
        setIsShowConfirmPopup(true);

        let text =" Are you sure to delete all data of { title } ?" ;
        text = text.replace('{ title }', title);
        setMessage(text);
        setConfirmPopupConfirmFunction(() => () => deleteNavBtn(dataId));
    }

    function updateTableContentConfirm(newTableContent, dataId, callbackFunction) {
        setIsShowConfirmPopup(true);

        let text =" Are you sure to update the table?" ;
        setMessage(text);

        setConfirmPopupConfirmFunction(() => {
            return () => {
                updateTableContent(dataId, newTableContent);
                callbackFunction();
            };
        });
    }

    function discardTableContentConfirm(callbackFunction) {
        setIsShowConfirmPopup(true);
        
        let text =" Are you sure to discard all the changes?" ;
        setMessage(text);

        setConfirmPopupConfirmFunction(() => {
            return () => {
                callbackFunction();
                setIsShowConfirmPopup(false);
            };
        });
    }

    function chooseTableContentImage(row, col, callbackFunction) {
        setCurTableContentRow(row);
        setCurTableContentCol(col);
        setUpdateTableContentImageFunction(() => {
            return (newValue, row, col) => {
                callbackFunction(newValue, row, col);
                setIsShowGalleryPopup(false);
            }
        })
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
                    <TableContent 
                        content={ navList[selected]?.tableContent } 
                        rowCount = { navList[selected]?.rowCount } 
                        colCount = { navList[selected]?.colCount }
                        updateTableContentConfirm={ updateTableContentConfirm }
                        discardTableContentConfirm={ discardTableContentConfirm }
                        dataId={ navList[selected]?.id } 
                        setIsShowGalleryPopup={ setIsShowGalleryPopup }
                        chooseTableContentImage={ chooseTableContentImage }
                    ></TableContent>
                    <ThemeButton setTheme={ setTheme }></ThemeButton>
                    <Authentication/>
                    <UploadImage setImageUpload={ setImageUpload } uploadFile={ uploadFile }/>
                    <button onClick={ () => setIsShowGalleryPopup(true) }>Show Gallery</button>
                </div>
                {isShowAddPopup ? (
                    <AddPopup 
                        setNewNavTitle={setNewNavTitle} 
                        setNewNavIsTesting={setNewNavIsTesting} 
                        newNavIsTesting={newNavIsTesting} 
                        onSubmitNav={onSubmitNav}
                        setIsShowAddPopup={setIsShowAddPopup}
                    ></AddPopup>
                ) : ( <></> )
                }
                {isShowConfirmPopup ? (
                    <ConfirmPopup
                        message={message}
                        onConfirm={confirmPopupConfirmFunction}
                        setIsShowConfirmPopup={setIsShowConfirmPopup}
                    ></ConfirmPopup>
                ) : ( <></> )
                }
                {isShowGalleryPopup ? (
                    <GalleryPopup 
                        imageList={imageList} 
                        setIsShowGalleryPopup={ setIsShowGalleryPopup}
                        curTableContentRow={curTableContentRow}
                        curTableContentCol={curTableContentCol}
                        updateTableContentImageFunction={updateTableContentImageFunction}
                    ></GalleryPopup>
                ) : ( <></> )
                }
            </div>
        </ThemeContext.Provider>
    );
}

export default App;
