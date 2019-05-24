import React, { Component } from 'react';
import '../Forms/Forms.css';
import {Button, ButtonToolbar, Col, Form, Modal, Row} from "react-bootstrap";
import DatePicker from "react-datepicker";

class DuplicateModal extends Component {
    constructor(...args) {
        super(...args);

        this.state = {
            validated: false,
            formName: '',
            refresh: false,
            isInvalid: null,
            startDate: new Date(),
            showTextModal: false};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text) {
        this.setState({formName: text });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        let localStorageKey = this.state.formName + ' - ' + this.state.startDate.toDateString().split(' ').slice(1).join(' ');
        if (form.checkValidity() === false || this.state.formName.replace(/\s/g, '').length === 0 || this.isNameInvalid(localStorageKey)) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({validated: false , isInvalid: true})
        } else {
            this.setState({ validated: true });
            event.preventDefault();
            event.stopPropagation();
           this.props.handleDuplication(localStorageKey, this.state.startDate)
        }
    }

    isNameInvalid(name) {
        console.log(name)
        if (localStorage.getItem(name) !== null || name.length === 250) {
            try {
                encodeURIComponent(name);
            } catch (e) {
                return true;
            }
            return true;
        }
        return false;
    }

    render() {

        return (
            <Modal className={'dup-modal'} show={this.props.showTextModal} onHide={() => this.props.closeTextModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>Duplicate Form</Modal.Title>
                </Modal.Header>
                <Modal.Body>Create Duplicate of {this.props.formName}</Modal.Body>
                <Modal.Footer>
                    <Form
                        className={'forms-container'}
                        noValidate
                        validated={this.state.validated}
                        onSubmit={e => this.handleSubmit(e, )}
                    >
                        <Form.Control id={'form-group-no-padding'}isInvalid={this.state.isInvalid} maxLength="250" type="text" placeholder={this.props.formName + " - Copy#"} required value={this.state.formName} onChange={e => this.handleChange(e.target.value)}/>
                        <Form.Control.Feedback type="invalid">
                            That name is either invalid or taken. Please provide a valid name.
                        </Form.Control.Feedback>
                        <DatePicker
                            selected={this.state.startDate}
                            onChange={(date) => this.setState({startDate: date})}
                        />
                        <ButtonToolbar>
                            <Button type={'submit'} id={"duplicate-button"} variant="primary">
                                Duplicate
                            </Button>
                            <Button  variant="danger" onClick={() => this.props.closeTextModal()}>
                                Cancel
                            </Button>
                        </ButtonToolbar>

                    </Form>
                </Modal.Footer>
            </Modal>


        )
    }
}

export default DuplicateModal;