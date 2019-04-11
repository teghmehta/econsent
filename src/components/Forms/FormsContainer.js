import React, { Component } from 'react';
import FormTextArea from "./FormTextArea";
import './Forms.css';

import {ButtonToolbar, Button} from "react-bootstrap";
import Header from "../Header/Header";
import {Link} from "react-router-dom";
import {withRouter} from "react-router";
let formData = require('../../constants/constants');

const LOCALSTORAGE_KEY = "formJSON";

class FormsContainer extends Component {

    constructor (props) {
        super(props);
        
        this.formData = {}
    }

    componentWillUnmount() {
        this.unlisten();
    }


    componentWillMount () {
        this.unlisten = this.props.history.listen((location, action) => {
            window.scrollTo(0, 0)
        });
        this.loadJson()
    }

    validateJson (json) {
        let validJson;

        try{
            validJson = JSON.stringify(JSON.parse(json), null, 2)
        } catch(e) {
            throw e
        }

        return validJson
    }

    loadJson = () => {
        // window.localStorage.getItem(LOCALSTORAGE_KEY) ||
        const json = JSON.stringify(formData, null, 2);
        this.setState({formData: JSON.parse(json) })
    }

    saveJson = () => {
        const validJson = this.validateJson(JSON.stringify(this.state.formData, null, 2))

        console.log('Save:', this.state.formData);
        if (!validJson) {
            return;
        }

        window.localStorage.setItem(
            LOCALSTORAGE_KEY,
            validJson
        )
    };


    changeValue(value, index) {
        this.state.formData[index].value = value;
        console.log(this.state.formData);
    }

    render() {
        return (
            <div className={'app-container'}>
                <Header formName={this.props.formName}/>
                <div className={'forms-container'}>
                    {formData.map((form, index) => <FormTextArea key={index} index={index} formTitle={form.title} formValue={form.value} placeholder={form.title} numOfRows={form.numOfRows} changeValue={(value, index) => this.changeValue(value, index)}/> )}
                    <ButtonToolbar>
                        <Button onClick={this.saveJson.bind(this)} variant="primary">Save</Button>
                        <Link className={'app-div-link'} to={'/'}><Button variant="secondary" onClick={this.saveJson.bind(this)} >Save and Continue Later</Button></Link>
                        <Link className={'app-div-link'} to={'/submit'}><Button onClick={this.saveJson.bind(this)} variant="outline-danger">Save and Submit</Button></Link>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
}

export default withRouter(FormsContainer);