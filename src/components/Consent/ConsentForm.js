import React, { Component } from 'react';
import '../Forms/Forms.css';
import {ButtonToolbar, Button, Container, Row, Col, Image} from "react-bootstrap";
import ImageHeader from "./ImageHeader";
import SingleLineText from "./SingleLineText";
const LOCALSTORAGE_KEY = "formJSON";

class ConsentForm extends Component {

    createPDF() {
        const input = document.getElementById('divIdToPrint');
        html2canvas(input)
            .then((canvas) => {
                const imgData = canvas.toDataURL('image/png');
            })
        ;
    }

    render() {
        return (
            <div className={'consent-form-container'}>
                <ImageHeader/>
                <h4>PATIENT INFORMED CONSENT TO PARTICIPATE IN A RESEARCH STUDY</h4>
                <SingleLineText heading={"Study Title"} text={"Effect of a mobile phone-based telemonitoring program on\n" +
                "the outcome of heart failure patients After an Incidence of\n" +
                "acute Decompensation: “Medly-AID”"}/>
                <button onClick={this.createPDF}></button>
            </div>
        );
    }
}

export default ConsentForm;