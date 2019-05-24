import React, { Component } from 'react';
import '../Forms/Forms.css';
import {Button} from "react-bootstrap";
import ImageUploader from 'react-images-upload';

class ImgUploader extends Component {

    render() {
        return (
            <div className={'image-uploader-container'}>
                <h6 className={'image-uploader-header'}>Upload Image used for Consent Form Header</h6>
                <ImageUploader
                    className={'image-uploader'}
                    buttonText='Choose images'
                    onChange={(e) => this.props.onDrop(e)}
                    withPreview={false}
                    withIcon={false}
                    label={'Max File Size: 5MB'}
                    imgExtension={['.jpg', '.png']}
                    maxFileSize={5242880}
                />
                {this.props.base64FileNames.map((name, index) => <p key={index}> {name}<Button onClick={() =>this.props.deletePhoto(name, index)} variant="danger">Delete</Button></p>)}
            </div>
        )
    }
}

export default ImgUploader;