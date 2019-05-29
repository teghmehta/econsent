import React, { Component } from 'react';
import './Forms.css';
import {Form} from "react-bootstrap";
import Header from "../Header/Header";
import {withRouter} from "react-router";
import "react-datepicker/dist/react-datepicker.css";
import FormTextArea from "./FormTextArea";
import DuplicateModal from "./DuplicateModal";
import BtnToolbar from "./BtnToolbar";
import ImgUploader from "./ImgUploader";
import ExitModal from "./ExitModal";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
let formData = require('../../constants/constants');
const MAX_PICTURES = 2;
const FILL_IN_HERE = "FILLINHERE"
const options = {
    autoClose: 2000,
    hideProgressBar: true,
};

class FormsContainer extends Component {

    constructor (props) {
        super(props);

        this.formData = {};
        this.state = {savingText: "", timeout: '', isDuplicateFormValid: false, localStorageKey: '', duplicateName: '', startDate: new Date(), lastPicturesLength: 0, base64Images: new Array(MAX_PICTURES), base64FileNames: new Array(MAX_PICTURES) };
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
        let dateOBJ = new Date(Date.parse(this.props.date));
        let localStorageKey = this.props.formName + ' - ' + dateOBJ.toDateString().split(' ').slice(1).join(' ');
        this.setState({localStorageKey})
        const json = window.localStorage.getItem(localStorageKey) || JSON.stringify(formData, null, 2);
        if (JSON.parse(window.localStorage.getItem(localStorageKey)) === null) {
            this.setState({isFormNew: true});
            let validJson = this.validateJson(JSON.stringify(formData, null, 2));
            if (!validJson) {
                return;
            }

            window.localStorage.setItem(
                localStorageKey,
                validJson
            )
        } else {
            this.setState({isFormNew: false});
        }

        let startDate;

        console.log(JSON.parse(json).find(x => x.date !== undefined))
        if (JSON.parse(json).find(x => x.date !== undefined).date === "") {startDate = dateOBJ;}
        else {startDate = new Date(JSON.parse(json).find(x => x.date !== undefined).date)}


        this.setState({formData: JSON.parse(json), formName: this.props.formName, startDate: startDate, base64Images: JSON.parse(json).find(x => x.base64Images !== undefined).base64Images, base64FileNames: JSON.parse(json).find(x => x.base64FileNames !== undefined).base64FileNames})
    };

    saveJson(shouldPush) {
        toast.info("Saved.", options);
        let validJson = this.replaceAndValidatedOnSave(this.props.date);
        window.localStorage.setItem(
            this.state.localStorageKey,
            validJson
        );
        if (this.state.startDate.getTime() !== new Date(Date.parse(this.props.date)).getTime()) {
            validJson = this.replaceAndValidatedOnSave(this.state.startDate);
            window.localStorage.setItem(
                this.state.localStorageKey,
                validJson
            );

            console.log(this.state.startDate.getTime() !== new Date(Date.parse(this.props.date)).getTime(), this.state.startDate, new Date(Date.parse(this.props.date)));

            if (!shouldPush) this.props.history.push('/form/' + encodeURIComponent(this.state.formName) + '/' + encodeURIComponent(this.state.startDate.toString()));
        }
    };

    replaceAndValidatedOnSave(date) {
        this.replaceFormData(this.state.formData.findIndex(form => form.date !== undefined), 'date', date);
        this.replaceFormData(this.state.formData.findIndex(form => form.base64Images !== undefined), 'base64Images', this.state.base64Images);
        this.replaceFormData(this.state.formData.findIndex(form => form.base64FileNames !== undefined), 'base64FileNames', this.state.base64FileNames);
        this.replaceFormData(this.state.formData.findIndex(form => form.formName !== undefined), 'formName', this.props.formName);

        this.setState({savingText: "Saved."});
        let timeout = setTimeout(function () {
            this.setState({savingText: ""});
        }.bind(this), 1500);
        this.setState({timeout});
        let validJson;
        try {
            validJson = this.validateJson(JSON.stringify(this.state.formData, null, 2));
            this.setState({isFormNew: false});
        } catch (e) {
            validJson = this.validateJson(JSON.stringify(formData, null, 2));
            this.setState({isFormNew: true});
        }

        if (!validJson) {
            return;
        }
        return validJson
    }

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
            let flag = item.value.replace(/\s/g, '').indexOf("<s>" + FILL_IN_HERE + "</s>") > -1 || (item.value.replace(/\s/g, '').indexOf("<s>") > -1 && item.value.replace(/\s/g, '').indexOf("</s>") > -1);
            if (flag) {
                this.replaceFormData(index, 'isValidated', false);
                isBlanksUnfilled = true
            }
        });

        return isBlanksUnfilled || isFormBlank
    }

    handleSubmit(event) {
        if (this.areFormsValidated()) {
            event.preventDefault();
            event.stopPropagation();
            alert("Please fill in all required* fields.")
            this.saveJson();
        } else {
            this.saveJson(true);
            this.props.history.push('/submit/' + encodeURIComponent(this.props.formName) + '/' + encodeURIComponent(this.state.startDate.toString()));
        }
    }

    isFormNew() {
        if (this.state.isFormNew) localStorage.removeItem(this.state.localStorageKey);
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
        if ((replacedItem === '<p></p>' || replacedItem === '') && (formStateData[index].isValidated !== undefined) ) { //if it is empty
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

    handleDateSelect(date) {
        this.setState({startDate: date});
        this.setState({localStorageKey: this.props.formName + " - " + date.toDateString().split(' ').slice(1).join(' ')});

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

    handleDuplication(localStorageKey, formName, date) {
        //save
        let validJson;
        try {
            validJson = this.validateJson(JSON.stringify(this.state.formData, null, 2));
            this.setState({isFormNew: false});
        } catch (e) {
            validJson = this.validateJson(JSON.stringify(formData, null, 2));
            this.setState({isFormNew: true});
        }

        if (!validJson) {
            return;
        }
        validJson = JSON.parse(validJson);
        validJson[validJson.findIndex(form => form.date !== undefined)].date = date;
        validJson[validJson.findIndex(form => form.formName !== undefined)].formName = formName;
        window.localStorage.setItem(
            localStorageKey,
            JSON.stringify(validJson)
        );
        this.setState({showTextModal: false})
        toast.info("Form Duplicated.", options);
    }


    render() {
        return (
            <div className={'app-container'}>
                <Header formName={this.state.localStorageKey} handleShow={this.handleShow} savingText={this.state.savingText}/>
                <div className={'forms-container'}>
                    <ToastContainer />
                    <Form onSubmit={e => this.handleSubmit(e)}>
                        {this.state.formData.map(function(form, index) {
                            if (form.date !== undefined || form.base64Images !== undefined) return ''; //Do not display the date JSON
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

                        <BtnToolbar startDate={this.state.startDate} handleShow={() => this.handleShow()} handleDateSelect={(date) => this.handleDateSelect(date)} saveJson={() => this.saveJson()} showDuplicateModal={() => this.setState({ showTextModal: true })}/>
                        <ImgUploader base64FileNames={this.state.base64FileNames} onDrop={(e) => this.onDrop(e)} deletePhoto={(name, index) => this.deletePhoto(name, index)}/>
                    </Form>
                </div>

                <DuplicateModal handleDuplication={(localStorageKey, formName, date) => this.handleDuplication(localStorageKey, formName, date)} formName={this.props.formName} showTextModal={this.state.showTextModal}  closeTextModal={() => this.setState({showTextModal: false})}/>

                <ExitModal handleClose={(flag) => this.handleClose(flag)} show={this.state.show} hide={() => this.setState({ show: false })}/>
            </div>
        );
    }
}

export default withRouter(FormsContainer);