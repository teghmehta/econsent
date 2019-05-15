import React, { Component } from 'react';
import FormTextArea from "./FormTextArea";
import './Forms.css';
import {ButtonToolbar, Button, Modal, Form} from "react-bootstrap";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import DatePicker from "react-datepicker";
import ImageUploader from 'react-images-upload';
import "react-datepicker/dist/react-datepicker.css";
let formData = require('../../constants/constants');
const MAX_PICTURES = 2;

class FormsContainer extends Component {

    constructor (props) {
        super(props);

        this.formData = {};
        this.state = {savingText: "", timeout: '', startDate: new Date(), pictures: new Array(MAX_PICTURES), lastPicturesLength: 0, base64Images: new Array(MAX_PICTURES), base64FileNames: new Array(MAX_PICTURES) };
        this.onDrop = this.onDrop.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.saveOnCtrlS = this.saveOnCtrlS.bind(this)
        document.addEventListener("keydown", this.saveOnCtrlS, false);
    }

    //This function makes sure that a maximum of two new images can be added
    onDrop(pictures) {
        let blank = this.state.pictures;
        this.setState({lastPicturesLength: pictures.length})

        if (this.state.pictures.length >= MAX_PICTURES
            || (this.state.lastPicturesLength === 0 && pictures.length > MAX_PICTURES)
            || (Math.abs(pictures.length - this.state.lastPicturesLength) > MAX_PICTURES)
            || (Math.abs(pictures.length - this.state.lastPicturesLength) > MAX_PICTURES-1 && this.state.pictures.length === MAX_PICTURES-1)) {
            alert("You have already reached the image limit.")
        } else {

            if (this.state.pictures.length === MAX_PICTURES-1 && this.state.pictures[0].name === pictures[pictures.length-1].name) {
                alert('There is already an Image with the same name!');
                return;
            }

            let slicedArray = pictures[pictures.length-1];
            if (Math.abs(pictures.length - this.state.lastPicturesLength) === MAX_PICTURES) {
                slicedArray = pictures.slice(Math.max(pictures.length - MAX_PICTURES, 0))
            }

            this.setState({
                pictures: this.state.pictures.concat(slicedArray),
            }, () => this.setBase64Images(this.state.pictures));

        }
    }

    setBase64Images(pictures) {
        console.log(pictures);
        let images = this.state.base64Images;
        let filenames = this.state.base64FileNames;
        pictures.map((picture) => {
            filenames = filenames.concat(picture.name)
            let reader = new FileReader();
            reader.readAsDataURL(picture);
            reader.onload = function () {
                images.push(reader.result)
                console.log(reader.result)
            }.bind(this);
            reader.onerror = function (error) {
                console.log('Error: ', error);
            };
        });

        this.setState({base64FileNames: filenames, base64Images: images}, () => console.log(this.state.base64Images, images));
    }

    loadBase64Images(json) {
        let pictures = [];
        try {
            pictures = this.getFileArrFromBase64Images(JSON.parse(json).find(x => x.base64Images).base64Images, JSON.parse(json).find(x => x.base64FileNames).base64FileNames);
        } catch (e) {
            console.log(e)
        }
        this.setState({pictures: pictures})
    }


    getFileArrFromBase64Images(base64Images, base64FileNames) {
        let ImageArray = [];
        ImageArray.concat(base64Images.map((base64Picture, index) => {
            let name = base64FileNames[index];
            const byteString = atob(base64Picture.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i += 1) {
                ia[i] = byteString.charCodeAt(i);
            }
            const newBlob = new Blob([ab], {
                type: 'image/jpeg',
            });
            var file = new File([newBlob], name, {type: 'image/png', lastModified: Date.now()});
            console.log(file);
            return file;
        }));
        console.log("Img Array", ImageArray)
        return ImageArray
    }


    deletePhoto(key, index) {
        let imagesRemoved = this.state.base64Images;
        imagesRemoved.splice(index, 1);
        let fileNamesRemoved = this.state.base64FileNames;
        fileNamesRemoved.splice(index, 1);
        console.log(index);
        this.setState({
            base64Images: imagesRemoved,
            base64FileNames: fileNamesRemoved,
            pictures: this.state.pictures.filter(function( obj ) {
            return obj.name !== key;
        })}, () => this.saveJson());
    }

    saveOnCtrlS(e) {
        if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            this.saveJson()
        }
    }


    componentWillUnmount() {
        this.unlisten();
        document.removeEventListener('scroll', this.saveOnCtrlS, false);
        clearTimeout(this.state.timeout)
    }


    componentWillMount () {
        this.unlisten = this.props.history.listen(() => {
            window.scrollTo(0, 0)
        });
        this.loadJson();
    }

    validateJson (json) {
        let validJson;

        try{
            validJson = JSON.stringify(JSON.parse(json), null, 2)
        } catch(e) {
            throw e
        }

        return validJson
    }

    loadJson = () => {
        const json = window.localStorage.getItem(this.props.formName) || JSON.stringify(formData, null, 2);
        if (JSON.parse(window.localStorage.getItem(this.props.formName)) === null) {
            this.setState({isFormNew: true});
            let validJson = this.validateJson(JSON.stringify(formData, null, 2));
            if (!validJson) {
                return;
            }

            window.localStorage.setItem(
                this.props.formName,
                validJson
            )
        } else {
            this.setState({isFormNew: false});
        }

        this.setState({formData: JSON.parse(json), pictures: JSON.parse(json).find(x => x.pictures !== undefined).pictures, base64Images: JSON.parse(json).find(x => x.base64Images !== undefined).base64Images, base64FileNames: JSON.parse(json).find(x => x.base64FileNames !== undefined).base64FileNames})

        this.loadBase64Images(json)
    };

    saveJson = () => {
        console.log(this.state.base64Images)
        this.replaceFormData(this.state.formData.findIndex(form => form.date !== undefined), 'date', this.state.startDate);
        this.replaceFormData(this.state.formData.findIndex(form => form.pictures !== undefined), 'pictures', this.state.pictures);
        this.replaceFormData(this.state.formData.findIndex(form => form.base64Images !== undefined), 'base64Images', this.state.base64Images);
        this.replaceFormData(this.state.formData.findIndex(form => form.base64FileNames !== undefined), 'base64FileNames', this.state.base64FileNames);

        this.setState({savingText:"Saved."});
        let timeout = setTimeout(function() {
            this.setState({savingText:""});
        }.bind(this), 1500);
        this.setState({timeout});
        let  validJson;
        try {
            validJson = this.validateJson(JSON.stringify(this.state.formData, null, 2));
            this.setState({isFormNew: false});
        } catch(e) {
            validJson = this.validateJson(JSON.stringify(formData, null, 2));
            this.setState({isFormNew: true});
        }

        if (!validJson) {
            return;
        }

        window.localStorage.setItem(
            this.props.formName,
            validJson
        )
    };

    areFormsValidated() {
        let isFormBlank = false;
            this.state.formData.some((item, index) => {
                let replacedItem = item.value.replace(/\s/g, '').replace('<br>', '');
                if ((replacedItem === '<p></p>' || replacedItem === '')&& (item.isValidated !== undefined)) { //if it is empty
                    this.replaceFormData(index, 'isValidated', false)
                    isFormBlank = true;
                    return;
                } else if (item.isValidated !== undefined) {
                    this.replaceFormData(index, 'isValidated', true)
                }
            }
        );


        let isBlanksUnfilled = false;
        this.state.formData.some((item, index) => {
            let flag = item.value.replace(/\s/g, '').indexOf("<strong>X</strong>") > -1;
            if (flag) {
                this.replaceFormData(index, 'isValidated', false);
                isBlanksUnfilled = true
            }
        });

        console.log("isFormBlank: ", isFormBlank);

        return isBlanksUnfilled || isFormBlank
    }

    handleSubmit(event) {
        if (this.areFormsValidated()) {
            event.preventDefault();
            event.stopPropagation();
            alert("Please fill in all required* fields.")
        } else {
            this.props.history.push('/submit/' + encodeURIComponent(this.props.formName))
        }
        this.saveJson();
    }

    isFormNew() {
        if (this.state.isFormNew) localStorage.removeItem(this.props.formName);
    }

    replaceFormData(index, property, value) {
        let formStateData = this.state.formData;
        formStateData[index][property] = value;
        this.setState({formData: formStateData});
    }

    changeValue(value, index) {
        let formStateData = this.state.formData;
        this.replaceFormData(index, 'value', value);

        let replacedItem = value.replace(/\s/g, '').replace('<br>', '');
        if ((replacedItem === '<p></p>' || replacedItem === '') && (formStateData[index].isValidated !== undefined)) { //if it is empty
            this.replaceFormData(index, 'isValidated', false)
        } else if (formStateData[index].isValidated !== undefined){
            this.replaceFormData(index, 'isValidated', true)
        }
    }

    handleClose(saveFlag) {
        this.setState({ show: false });
        if (saveFlag) this.saveJson();
        else this.isFormNew();
        this.props.history.push('/')
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className={'app-container'}>
                <Header formName={this.props.formName} handleShow={this.handleShow} savingText={this.state.savingText}/>
                <div className={'forms-container'}>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        {this.state.formData.map(function(form, index) {
                            if (form.date !== undefined || form.pictures !== undefined) return ''; //Do not display the date JSON
                            if (form.table) {
                                return <div key={index} className={'table-div'} dangerouslySetInnerHTML={{__html:form.value}}/>
                            } else {
                                return (
                                    <FormTextArea key={index}
                                                  isValidated={form.isValidated}
                                                  index={index} formTitle={form.title}
                                                  formValue={form.value} placeholder={form.title}
                                                  numOfRows={form.numOfRows}
                                                  changeValue={(value, index) => this.changeValue(value, index)}/> )
                            }
                        }.bind(this) )}
                        <div className={'image-uploader-container'}>
                            <h6 className={'image-uploader-header'}>Upload Image used for Consent Form Header</h6>
                            <ImageUploader
                                className={'image-uploader'}
                                buttonText='Choose images'
                                onChange={(e) => this.onDrop(e)}
                                withPreview={false}
                                withIcon={false}
                                label={'Max File Size: 5MB'}
                                imgExtension={['.jpg', '.png']}
                                maxFileSize={5242880}
                            />
                            {this.state.base64FileNames.map((name, index) => <p key={index}> {name}<Button onClick={() =>this.deletePhoto(name, index)} variant="danger">Delete</Button></p>)}
                        </div>
                    <ButtonToolbar>
                        <Button onClick={this.saveJson.bind(this)} variant="primary">Save</Button>
                        <Button variant="secondary" onClick={this.handleShow} >Go Back</Button>
                        <Button type={"submit"} variant="outline-danger">Save and Submit</Button>
                        <h6 className={'date-picker-header'}>Informed Consent Form Version Date:</h6>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={(date) => this.setState({startDate: date})}
                            onSelect={() => this.replaceFormData(this.state.formData.length -1 , 'date', this.state.startDate)}
                        />
                    </ButtonToolbar>

                    </Form>
                </div>

                <Modal show={this.state.show} onHide={() => this.setState({ show: false })}>
                    <Modal.Header closeButton>
                        <Modal.Title>Save Changes</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Do you want to save your changes before you go back?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.handleClose(false)}>
                            Discard
                        </Button>
                        <Button variant="primary" onClick={() => this.handleClose(true)}>
                            Save Changes
                        </Button>
                        <Button variant="danger" onClick={() => this.setState({ show: false })}>
                            Cancel
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default withRouter(FormsContainer);