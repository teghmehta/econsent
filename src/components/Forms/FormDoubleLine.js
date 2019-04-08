import React, { Component } from 'react';
import {Form, Col, Row} from "react-bootstrap";

class FormDoubleLine extends Component {
    render() {
        return (
            <Form.Group as={Row} controlId="">
                <Form.Label column sm="2">
                    {this.props.formTitle}
                </Form.Label>
                <Form.Control type="text"/>
            </Form.Group>
        );
    }
}

export default FormDoubleLine;
