import React, { Component } from 'react';
import FormTextArea from "./FormTextArea";
import './Forms.css';

import {ButtonToolbar, Button} from "react-bootstrap";
import Header from "../Header/Header";
let formData = require('../../constants/constants');

const LOCALSTORAGE_KEY = "formJSON";

class FormsContainer extends Component {

    constructor (props) {
        super(props)
        
        this.formData = {}
    }

    componentWillMount () {
        this.setState({formData});
        this.loadJson()
    }

    validateJson (json) {
        let validJson

        try{
            validJson = JSON.stringify(JSON.parse(json), null, 2)
        } catch(e) {
            throw e
        }

        return validJson
    }

    loadJson = () => {
        const json = window.localStorage.getItem(LOCALSTORAGE_KEY) || JSON.stringify(formData, null, 2);
        console.log('JSON LOADJSON', json);
        this.setState({formData: JSON.parse(json) })
    }

    saveJson = () => {
        const validJson = this.validateJson(JSON.stringify(this.state.formData, null, 2))

        console.log('invalid json', this.state.formData);
        if (!validJson) {
            return;
        }

        window.localStorage.setItem(
            LOCALSTORAGE_KEY,
            validJson
        )
    };

    changeValue(value, index, form) {
        this.state.formData[index].value = value;
        console.log(this.state.formData);
    }

    render() {
        return (
            <div className={'app-container'}>
                <Header/>
                <div className={'forms-container'}>
                    {formData.map((form, index) => <FormTextArea key={index} index={index} formTitle={form.title} formValue={form.value} placeholder={form.title} numOfRows={form.numOfRows} changeValue={(value, index) => this.changeValue(value, index, form)}/> )}
                    <ButtonToolbar>
                        <Button onClick={this.saveJson.bind(this)} variant="primary">Save</Button>
                        <Button variant="secondary">Save and Continue Later</Button>
                        <Button onClick={this.loadJson.bind(this)} variant="outline-danger">Save and Submit</Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
}

export default FormsContainer;