import { useEffect, useContext } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro'

import ThemeContext from '../../context/ThemeContext';

import './GalleryPopup.scss';

function GalleryPopup({ imageList, setIsShowGalleryPopup }) {
    const theme = useContext(ThemeContext);
    const className = "galleryPopupContainer " + theme;

    useEffect(() => {
        console.log("GalleryPopup rendered: ");
    })

    return (
        <div className={ className }>
            <div className="galleryPopupBg">
            </div>
            <div className="content">
                { (imageList.length === 0) ? (
                        <div className='noImagesTxt'>No Images uploaded</div>
                ) : (
                    imageList.map((url) => {
                        return <img width='180' height='180' alt="" key={url} src={url} />
                    })
                )}
                <FontAwesomeIcon className="closeButton" onClick={ () => {setIsShowGalleryPopup(false)}} icon={icon({name: 'circle-xmark', style: 'solid'})} />
            </div>
        </div>
    )
}

export default GalleryPopup;