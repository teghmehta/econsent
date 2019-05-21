import React, { Component } from 'react';
import './Forms.css';
import {ButtonToolbar, Button, Modal, Form} from "react-bootstrap";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import DatePicker from "react-datepicker";
import ImageUploader from 'react-images-upload';
import "react-datepicker/dist/react-datepicker.css";
import FormTextArea from "./FormTextArea";
let formData = require('../../constants/constants');
const MAX_PICTURES = 2;

class FormsContainer extends Component {

    constructor (props) {
        super(props);

        this.formData = {};
        this.state = {savingText: "", timeout: '', savedFormName: '', startDate: new Date(), lastPicturesLength: 0, base64Images: new Array(MAX_PICTURES), base64FileNames: new Array(MAX_PICTURES) };
        this.onDrop = this.onDrop.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.saveOnCtrlS = this.saveOnCtrlS.bind(this)
        document.addEventListener("keydown", this.saveOnCtrlS, false);
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

        let savedFormName = this.props.formName + " / " +  this.state.startDate.toDateString().split(' ').slice(1).join(' ');
        this.setState({savedFormName: savedFormName});
        this.loadJson(savedFormName)
    }


    //This function makes sure that a maximum of two new images can be added
    onDrop(pictures) {
        this.setState({lastPicturesLength: pictures.length})

        if (this.state.base64Images.length >= MAX_PICTURES
            || (this.state.lastPicturesLength === 0 && pictures.length > MAX_PICTURES)
            || (Math.abs(pictures.length - this.state.lastPicturesLength) > MAX_PICTURES)
            || (Math.abs(pictures.length - this.state.lastPicturesLength) > MAX_PICTURES-1 && this.state.base64Images.length === MAX_PICTURES-1)) {
            alert("You have already reached the image limit.")
        } else {

            if (this.state.base64Images.length === MAX_PICTURES-1 && this.state.base64FileNames[0] === pictures[pictures.length-1].name) {
                alert('There is already an Image with the same name!');
                return;
            }

            let slicedArray = pictures.slice(Math.max(pictures.length - 1, 0));
            if (Math.abs(pictures.length - this.state.lastPicturesLength) === MAX_PICTURES) {
                slicedArray = pictures.slice(Math.max(pictures.length - MAX_PICTURES, 0))
                console.log('Sliced: ', slicedArray)
            }
            this.setBase64Images(slicedArray);

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


    deletePhoto(key, index) {
        let imagesRemoved = this.state.base64Images;
        imagesRemoved.splice(index, 1);
        let fileNamesRemoved = this.state.base64FileNames;
        fileNamesRemoved.splice(index, 1);
        console.log(index);
        this.setState({
            base64Images: imagesRemoved,
            base64FileNames: fileNamesRemoved}, () => this.saveJson());
    }

    saveOnCtrlS(e) {
        if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            this.saveJson()
        }
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

    loadJson = (savedFormName) => {
        if (!savedFormName) savedFormName = this.state.savedFormName

        const json = window.localStorage.getItem(savedFormName) || JSON.stringify(formData, null, 2);
        if (JSON.parse(window.localStorage.getItem(savedFormName)) === null) {
            this.setState({isFormNew: true});
            let validJson = this.validateJson(JSON.stringify(formData, null, 2));
            if (!validJson) {
                return;
            }

            window.localStorage.setItem(
                savedFormName,
                validJson
            )
        } else {
            this.setState({isFormNew: false});
        }

        let startDate;

        if (JSON.parse(json).find(x => x.date !== undefined).date === "")  startDate = new Date();
        else startDate = new Date(JSON.parse(json).find(x => x.date !== undefined).date);


        this.setState({formData: JSON.parse(json), startDate: startDate, base64Images: JSON.parse(json).find(x => x.base64Images !== undefined).base64Images, base64FileNames: JSON.parse(json).find(x => x.base64FileNames !== undefined).base64FileNames})
    };

    saveJson = () => {
        console.log(this.state.base64Images)
        this.replaceFormData(this.state.formData.findIndex(form => form.date !== undefined), 'date', this.state.startDate);
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
            this.state.savedFormName,
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

        return isBlanksUnfilled || isFormBlank
    }

    handleSubmit(event) {
        this.saveJson();
        if (this.areFormsValidated()) {
            event.preventDefault();
            event.stopPropagation();
            alert("Please fill in all required* fields.")
        } else {
            this.props.history.push('/submit/' + encodeURIComponent(this.state.savedFormName))
        }
    }

    isFormNew() {
        if (this.state.isFormNew) localStorage.removeItem(this.state.savedFormName);
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
        if ((replacedItem === '<p></p>' || replacedItem === '') && (formStateData[index].isValidated !== undefined)) {
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
                <Header formName={this.state.savedFormName} handleShow={this.handleShow} savingText={this.state.savingText}/>
                <div className={'forms-container'}>
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        {this.state.formData.map(function(form, index) {
                            if (form.date !== undefined || form.base64Images !== undefined) return '';
                            if (form.table) {
                                return <div key={index} className={'table-div'} dangerouslySetInnerHTML={{__html:form.value}}/>
                            } else {
                                return (

                                    <div key={index} className={"editorContainer"}>
                                        <Form.Label className={'isValidated-' + form.isValidated}>
                                            {form.title} {form.isValidated !== undefined ? form.isValidated === true ? "" : "*" : ""}
                                        </Form.Label>
                                        <FormTextArea
                                                      isValidated={form.isValidated}
                                                      index={index} formTitle={form.title}
                                                      formValue={form.value} placeholder={form.title}
                                                      numOfRows={form.numOfRows}
                                                      changeValue={(value, index) => this.changeValue(value, index)}/>
                                    </div>)
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