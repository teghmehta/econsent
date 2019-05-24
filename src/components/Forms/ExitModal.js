import React, { Component } from 'react';
import '../Forms/Forms.css';
import {Button, Modal} from "react-bootstrap";
import ImageUploader from 'react-images-upload';

class ExitModal extends Component {

    render() {
        return (
            <Modal show={this.props.show} onHide={() => this.props.hide()}>
                <Modal.Header closeButton>
                    <Modal.Title>Save Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>Do you want to save your changes before you go back?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => this.props.handleClose(false)}>
                        Discard
                    </Button>
                    <Button variant="primary" onClick={() => this.props.handleClose(true)}>
                        Save Changes
                    </Button>
                    <Button variant="danger" onClick={() => this.props.hide()}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default ExitModal;