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
        document.addEventListener("keydown", function(e) {
            if (e.keyCode === 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
                e.preventDefault();
                this.saveJson()
            }
        }.bind(this), false);
    }

    componentWillUnmount() {
        this.unlisten();
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

    handleSubmit(event) {
        if (this.state.isValidated === false) {
            event.preventDefault();
            event.stopPropagation();
            alert("Please fill in all fields.")
        } else {
            this.props.history.push('/submit/' + encodeURIComponent(this.props.formName))
        }
        this.saveJson();
    }

    isFormNew() {
        console.log("isFormNew()", this.state.isFormNew);
        if (this.state.isFormNew) localStorage.removeItem(this.props.formName);
    }


    changeValue(value, index, isValidated) {
        if (isValidated !== undefined) {
            this.setState({isValidated: isValidated});
        }
        let formStateData = this.state.formData;
        formStateData[index].value = value;
        this.setState({formData: formStateData});
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
                        {this.state.formData.map((form, index) =>
                            <FormTextArea key={index} isFillInTheBlank={form.isFillInTheBlank}
                                          index={index} formTitle={form.title}
                                          formValue={form.value} placeholder={form.title}
                                          numOfRows={form.numOfRows}
                                          changeValue={(value, index, isValidated) => this.changeValue(value, index, isValidated)}/> )}
                        <table>
                            <tbody>
                                <tr>
                                    <td>___________________________________________________</td>
                                    <td>___________________________________________________</td>
                                    <td>___________________________________________________</td>
                                </tr>
                                <tr>
                                    <td>Name of Participant</td>
                                    <td>Signature</td>
                                    <td>Date</td>
                                </tr>
                                <tr>
                                    <td>___________________________________________________</td>
                                    <td>___________________________________________________</td>
                                    <td>___________________________________________________</td>
                                </tr>
                                <tr>
                                    <td>Name of Person obtaining consent (print)</td>
                                    <td>Signature</td>
                                    <td>Date</td>
                                </tr>
                            </tbody>
                        </table>
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