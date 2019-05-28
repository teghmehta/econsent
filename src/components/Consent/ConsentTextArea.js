import React, { Component } from 'react';
import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Form} from "react-bootstrap";

class FormTextArea extends Component {
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

FormTextArea.modules = {
    toolbar: [
        [{size: []}],
        ['bold', 'italic', 'underline'],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}


/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
FormTextArea.formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent', 'code-block',
];

export default FormTextArea;
