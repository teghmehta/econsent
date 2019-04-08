import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";


class FormTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: ''
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({formValue: this.props.formValue });
    }

    handleChange(text) {
        this.setState({formValue: text });
        this.props.changeValue(text, this.props.index);
    }

    render() {
        if (this.props.numOfRows <= 1) {
            return (
                <Form.Group as={Row} controlId="">
                    <Form.Label column sm="2">
                        {this.props.formTitle}
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control type="text" placeholder={this.props.placeholder} value={this.state.formValue} onChange={e => this.handleChange(e.target.value)}/>
                    </Col>
                </Form.Group>
            );
        } else {
            return (
                <Form>
                    <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
                        <Form.Label column sm="2">{this.props.formTitle}</Form.Label>
                        <Col sm="10">
                            <Form.Control className={'text-area'} as="textarea"
                                          placeholder={this.props.placeholder}
                                          rows={this.props.numOfRows}
                                          value={this.state.formValue}
                                          onChange={e => this.handleChange(e.target.value, this.props.index)}
                            />
                        </Col>
                    </Form.Group>
                </Form>
            );
        }
    }
}

export default FormTextArea;
