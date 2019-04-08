import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";


class FormTextArea extends Component {
    render() {
        return (
            <Form>
                <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                    <Form.Label column sm="2">{this.props.formTitle}</Form.Label>
                    <Col sm="10">
                        <Form.Control className={'text-area'} as="textarea"
                                      placeholder={this.props.placeholder}
                                      rows={this.props.numOfRows} value={this.props.formValue}/>
                    </Col>
                </Form.Group>
            </Form>
        );
    }
}

export default FormTextArea;
