import React, { Component } from 'react';
import Header from "../Header/Header";
import {Button, ButtonToolbar, Col, DropdownButton, Form, InputGroup, Dropdown} from "react-bootstrap";
import './Consent.css'

class StartupForm extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            validated: false,
            formName: '' };

        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(text) {
        this.setState({formName: text });
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            this.props.history.push('/new/' + this.state.formName)
        }
        this.setState({ validated: true });
    }

    openForms() {
        let rows = [];
        Object.keys(localStorage).forEach(function(key, i){
            rows.push(<Dropdown.Item key={i} href={"/new/" + key}>{key}</Dropdown.Item>)
        });
        // for(let i in localStorage) {
        //     console.log(localStorage.length)
        // }
        return rows
    }

    render() {
        return (
            <div className="startup-container">
                <Header/>
                <Form
                    className={'forms-container'}
                    noValidate
                    validated={this.state.validated}
                    onSubmit={e => this.handleSubmit(e, )}
                >
                    <Form.Row>
                        <Form.Group as={Col} md="6" controlId="validationName">
                            <Form.Control type="text" placeholder="Form Name" required value={this.state.formName} onChange={e => this.handleChange(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                Please provide a valid name
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <ButtonToolbar>
                        <Button type='submit' variant="primary">New Form</Button>
                        <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                            {this.openForms()}
                        </DropdownButton>
                    </ButtonToolbar>
                </Form>

            </div>
        );
    }
}

export default StartupForm;