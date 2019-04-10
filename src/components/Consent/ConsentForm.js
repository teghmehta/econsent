import React, { Component } from 'react';
import '../Forms/Forms.css';
import {ButtonToolbar, Button, Container, Row, Col, Image} from "react-bootstrap";
import ImageHeader from "./ImageHeader";
import ConsentText from "./ConsentText";
import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf'
import FormTextArea from "../Forms/FormsContainer";
const LOCALSTORAGE_KEY = "formJSON";

class ConsentForm extends Component {

    createPDF() {
        const input = document.getElementById('consent-form-container');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
            });
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF();
                pdf.addImage(imgData, 'PNG', 0, 0);
                pdf.save("ConsentForm.pdf");
            });
    }

    constructor (props) {
        super(props);
        this.state = {formData: []}
    }

    componentWillMount () {
        this.loadJson()
    }


    loadJson = () => {
        const json = window.localStorage.getItem(LOCALSTORAGE_KEY);

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

                {/*<button onClick={this.createPDF}></button>*/}
            </div>
        );
    }
}

export default ConsentForm;