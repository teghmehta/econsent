import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import {Row, Form} from "react-bootstrap";

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
                className={''}
                noValidate
                validated={this.state.validated}
                onSubmit={e => this.handleSubmit(e, )}
            >
                <Form.Row>
                    <Form.Group as={Row} controlId="validationName">
                        <Form.Label>{this.props.label}</Form.Label>
                        <Form.Control maxLength="50" type="text" required
                                      onChange={(e) => this.props.handleChange(e.target.value)}
                                      placeholder={this.props.label}/>
                    </Form.Group>
                </Form.Row>
            </Form>
        )

    }
}

export default ConsentTextArea;
