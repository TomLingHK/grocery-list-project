import { useEffect, useContext } from 'react';

import ThemeContext from '../../context/ThemeContext';

import './GalleryPopup.scss';

function GalleryPopup({ imageList }) {
    const theme = useContext(ThemeContext);
    const className = "galleryPopupContainer " + theme;
    useEffect(() => {
        console.log("GalleryPopup rendered: ");
    })
    
    // if (!isShowConfirmPopup) return(<></>);

    return (
        <div className={ className }>
            <div className="galleryPopupBg">
            </div>
            <div className="content">
                {imageList.map((url) => {
                    return <img key={url} src={url} />
                })}
            </div>
        </div>
    )
}

export default GalleryPopup;