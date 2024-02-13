import './UploadImage.scss'

function UploadImage({ setImageUpload, uploadFile }) {
    return (
        <div className="uploadImagePanel">
            <input type="file" onChange={(event) => {
                setImageUpload(event.target.files[0]);
            }}></input>
            <button onClick={ uploadFile }>Upload Image</button>
        </div>
    )
}

export default UploadImage;