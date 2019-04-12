import React, { Component } from 'react';
import '../Forms/Forms.css';
import {ButtonToolbar, Button, Container, Row, Col, Image} from "react-bootstrap";
import ImageHeader from "./ImageHeader";
import ConsentText from "./ConsentText";
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf'
import FormTextArea from "../Forms/FormsContainer";
import {withRouter} from "react-router";
const LOCALSTORAGE_KEY = "formJSON";

class ConsentForm extends Component {

    constructor (props) {
        super(props);
        this.state = {formData: []}
    }

    componentWillMount () {
        this.loadJson()
    }

    loadJson = () => {
        const json = window.localStorage.getItem(this.props.formName);

        console.log('ConsentForm', JSON.parse(json));

        this.setState({formData: JSON.parse(json)});

        console.log('ConsentForm', this.state.formData);
    }

    render() {
        return (
            <div id='consent-form-container' className={'consent-form-container'}>
                <ImageHeader/>
                <h6 className={'consent-form-title'}>PATIENT INFORMED CONSENT TO PARTICIPATE IN A RESEARCH STUDY</h6>

                {this.state.formData.map((form, index) => <ConsentText key={index} numOfRows={form.numOfRows} heading={form.title} text={form.value}/>)}

                {/*<Button onClick={this.createPDF.bind(this)} variant="primary">Save</Button>*/}
            </div>
        );
    }
}

export default ConsentForm;