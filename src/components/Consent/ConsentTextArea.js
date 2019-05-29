import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import {Form} from "react-bootstrap";

class ConsentTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: '',
        };

    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.formValue !== nextState.formValue;
    }

    render() {
        return (
            <Form
                noValidate
                validated={this.state.validated}
            >
                <Form.Row>
                    <Form.Group>
                        <Form.Label>{this.props.label}</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            onChange={(e) => this.props.handleChange(e.target.value)}
                            placeholder={this.props.label}
                        />
                        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
            </Form>
        )

    }
}

export default ConsentTextArea;
