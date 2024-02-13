import './UploadImage.scss'

function UploadImage({ setImageUpload, uploadFile, fileRef }) {
    function onUploadFileChange(event) {
        const fileType = event.target.files[0].type;
        const acceptType = ["image/png", "image/gif", "image/jpeg", "image/jpg"];

        if (acceptType.indexOf(fileType) === -1) {
            alert("Please upload image only!");
            fileRef.current && (fileRef.current.value = '');
            return;
        }

        setImageUpload(event.target.files[0]);
    }

    return (
        <div className="uploadImagePanel">
            <input
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                onChange={(event) => onUploadFileChange(event)}
                ref={ fileRef }
            ></input>
            <button onClick={ uploadFile }>Upload Image</button>
        </div>
    )
}

export default UploadImage;