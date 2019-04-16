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
        this.state = {validated: false}

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);

    }

    componentWillUnmount() {
        this.unlisten();
    }


    componentWillMount () {
        this.unlisten = this.props.history.listen((location, action) => {
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
            let validJson = this.validateJson(JSON.stringify(formData, null, 2));
            if (!validJson) {
                return;
            }

            window.localStorage.setItem(
                this.props.formName,
                validJson
            )
        }
        this.setState({formData: JSON.parse(json) })
    };

    saveJson = () => {
        let  validJson;
        try {
            console.log("Save JSON", this.state.formData);
            validJson = this.validateJson(JSON.stringify(this.state.formData, null, 2));
        } catch(e) {
            validJson = this.validateJson(JSON.stringify(formData, null, 2));
        }

        if (!validJson) {
            return;
        }

        window.localStorage.setItem(
            this.props.formName,
            validJson
        )
    };

    submitForm() {
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.props.history.push('/submit/' + encodeURIComponent(this.props.formName))
        }
        this.saveJson();
        this.setState({ validated: true });
    }


    changeValue(value, index) {
        let formStateData = this.state.formData;
        formStateData[index].value = value;
        this.setState({formData: formStateData});
    }

    handleClose(saveFlag) {
        this.setState({ show: false });
        if (saveFlag) this.saveJson();
        this.props.history.push('/')
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <div className={'app-container'}>
                <Header formName={this.props.formName} handleShow={this.handleShow}/>
                <div className={'forms-container'}>
                    <Form
                        noValidate
                        validated={this.state.validated}
                        onSubmit={e => this.handleSubmit(e)}
                    >
                        {this.state.formData.map((form, index) => <FormTextArea key={index} index={index} formTitle={form.title} formValue={form.value} placeholder={form.title} numOfRows={form.numOfRows} changeValue={(value, index) => this.changeValue(value, index)}/> )}


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