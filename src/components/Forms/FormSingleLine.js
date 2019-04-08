import React, { Component } from 'react';
import {Form, Col, Row} from "react-bootstrap";


class FormSingleLine extends Component {
    render() {
        return (
            <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                    {this.props.formTitle}
                </Form.Label>
                <Col sm="10">
                    <Form.Control type="text" placeholder={this.props.placeholder}/>
                </Col>
            </Form.Group>
        );
    }
}

export default FormSingleLine;
