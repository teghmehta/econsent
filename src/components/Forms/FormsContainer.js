import React, { Component } from 'react';
import FormTextArea from "./FormTextArea";
import './Forms.css';
import {ButtonToolbar, Button, Modal, Form} from "react-bootstrap";
import Header from "../Header/Header";
import {withRouter} from "react-router";
let formData = require('../../constants/constants');

class FormsContainer extends Component {

    constructor (props) {
        super(props);

        this.formData = {};
        this.state = {savingText: ""};
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.saveOnCtrlS = this.saveOnCtrlS.bind(this)
        document.addEventListener("keydown", this.saveOnCtrlS, false);
    }

    saveOnCtrlS(e) {
        if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
            e.preventDefault();
            console.log('t')
            this.saveJson()
        }
    }


    componentWillUnmount() {
        this.unlisten();
        document.removeEventListener('scroll', this.saveOnCtrlS, false);
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
        this.setState({formData: JSON.parse(json) })
    };

    saveJson = () => {
        this.setState({savingText:"Saved."});
        setTimeout(function() {
            this.setState({savingText:""});
        }.bind(this), 1500);
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
        console.log("isFormNew()", this.state.isFormNew);
        if (this.state.isFormNew) localStorage.removeItem(this.props.formName);
    }

    replaceFormData(index, property, value) {
        let formStateData = this.state.formData;
        formStateData[index][property] = value;
        if (index == 19 || index === 10) console.log(index, property, value)
        this.setState({formData: formStateData});
    }

    changeValue(value, index) {
        let formStateData = this.state.formData;
        this.replaceFormData(index, 'value', value);

        let replacedItem = value.replace(/\s/g, '').replace('<br>', '');
        if ((replacedItem === '<p></p>' || replacedItem === '') && (formStateData[index].isValidated !== undefined)) { //if it is empty
            /*let formStateData = this.state.formData;
            formStateData[index].isValidated = false;
            this.setState({formData: formStateData});*/
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

                    <ButtonToolbar>
                        <Button onClick={this.saveJson.bind(this)} variant="primary">Save</Button>
                        <Button variant="secondary" onClick={this.handleShow} >Go Back</Button>
                        <Button type={"submit"} variant="outline-danger">Save and Submit</Button>
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