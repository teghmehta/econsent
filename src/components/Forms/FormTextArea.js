import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";


class FormTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: '',
            validated: false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({formValue: this.props.formValue });
    }

    handleChange(text) {
        this.setState({formValue: text });
        try {
            this.props.changeValue(text, this.props.index);
        } catch (e) {
            
        }
    }

    render() {
        if (this.props.numOfRows <= 1) {
            return (
                    <Form.Group as={Row} controlId="">
                        <Form.Label column sm="2">
                            {this.props.formTitle}
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control required type="textarea" placeholder={this.props.placeholder} value={this.state.formValue} onChange={e => this.handleChange(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
            );
        } else {
            return (
                    <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                        <Form.Label column sm="2">{this.props.formTitle}</Form.Label>
                        <Col sm="10">
                            <Form.Control className={'text-area'} as="textarea"
                                          placeholder={this.props.placeholder}
                                          rows={this.props.numOfRows}
                                          required
                                          value={this.state.formValue}
                                          onChange={e => this.handleChange(e.target.value, this.props.index)}
                            />
                            <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
                        </Col>
                    </Form.Group>
            );
        }
    }
}

export default FormTextArea;
