import React, { Component } from 'react';
import FormTextArea from "./FormTextArea";
import './Forms.css';
import {ButtonToolbar, Button} from "react-bootstrap";
let fs = require("fs");
let formData = require('../../constants/constants');

class FormsContainer extends Component {

    changeValue(value, index, form) {
        formData[index].value = value;
        console.log(formData);
    }

    save() {
        let data = JSON.stringify(formData)
        fs.writeFile('student-3.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
        });
    }

    render() {
        return (
            <div className={'forms-container'}>
                {formData.map((form, index) => <FormTextArea key={index} index={index} formTitle={form.title} formValue={form.value} placeholder={form.title} numOfRows={form.numOfRows} changeValue={(value, index) => this.changeValue(value, index, form)}/> )}
                <ButtonToolbar>
                    <Button onClick={this.save.bind(this)} variant="primary">Save</Button>
                    <Button variant="secondary">Save and Continue Later</Button>
                    <Button variant="outline-danger">Save and Submit</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

export default FormsContainer;
