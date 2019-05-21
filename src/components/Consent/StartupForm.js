import React, { Component } from 'react';
import Header from "../Header/Header";
import {Button, ButtonToolbar, Col, DropdownButton, Form, Dropdown} from "react-bootstrap";
import './Consent.css'

class StartupForm extends Component {

    constructor(...args) {
        super(...args);

        this.state = {
            validated: false,
            formName: '',
            refresh: false,
            isInvalid: null};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(text) {
        this.setState({formName: text });
    }

    handleSubmit(event) {
        let formName = this.state.formName + ' - ' + new Date().toDateString().split(' ').slice(1).join(' ');
        const form = event.currentTarget;
        if (form.checkValidity() === false || this.isNameInvalid(formName)) {
            event.preventDefault();
            event.stopPropagation();
            this.setState({validated: false , isInvalid: true})
        } else {
            this.setState({ validated: true });
            this.props.history.push('/form/' + encodeURIComponent(formName))
        }
    }
    deleteForm(key) {
        localStorage.removeItem(key)
        this.setState({refresh: true})
    }

    isNameInvalid(name) {
        if (localStorage.getItem(name) !== null || name.length === 250 || !name.replace(/\s/g, '').length) {
            if (!name.replace(/\s/g, '').length) {
                return true;
            }
            try {
                encodeURIComponent(name);
            } catch (e) {
                return false
            }
        }
        return false
    }

    openForms() {
        let rows = [];
        let sorted = Object.keys(localStorage).sort();
        console.log(sorted)
        sorted.forEach(function(key, i){
            let date = new Date(Date.parse(JSON.parse(localStorage.getItem(key)).find(x => x.date !== undefined).date)).toDateString().split(' ').slice(1).join(' ');
            rows.push(
                <div key={i} className={"dropdown-div"}>
                    <Dropdown.Item key={i} href={"/form/" + key}>Informed Consent Form ({key.length > 30 ? key.substring(0, Math.min(key.length, 70)) + '...'  : key})</Dropdown.Item>
                    <Button onClick={() => this.deleteForm(key)} variant="danger">Delete</Button>
                </div>)
        }.bind(this));
        if (rows.length > 0) {
            return <DropdownButton id="dropdown-basic-button" title="Open Forms">
                {rows}
            </DropdownButton>
        } else {
            return ""
        }

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
                            <Form.Control isInvalid={this.state.isInvalid} maxLength="250" type="text" placeholder="Form Name" required value={this.state.formName} onChange={e => this.handleChange(e.target.value)}/>
                            <Form.Control.Feedback type="invalid">
                                That name is either invalid or taken. Please provide a valid name.
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>

                    <ButtonToolbar>
                        <Button type='submit' variant="primary">New Form</Button>
                        {this.openForms()}
                    </ButtonToolbar>
                </Form>

            </div>
        );
    }
}

export default StartupForm;