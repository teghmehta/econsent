import React, { Component } from 'react';
import ReactQuill, {Quill} from "react-quill";
import 'react-quill/dist/quill.snow.css';
import {Form} from "react-bootstrap";
import ConsentTextArea from "./ConsentTextArea";

class ConsentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: '',
            validated: false
        };

        this.handleName = this.handleName.bind(this);
        this.handleDate = this.handleDate.bind(this);
    }

    handleName(name) {
        if (this.props.nameText === 'Name of Participant') {
            this.props.changeParticipantName(name);
        } else {
            this.props.changePersonObtainingName(name);
        }
    }

    handleDate(date) {
        if (this.props.nameText === 'Name of Participant') {
            this.props.changeParticipantDate(date);
        } else {
            this.props.changePersonObtainingDate(date);
        }
    }


    displayConsentAreaText(index) {
        if (!this.props.isFinal) {
            if (index === 0) {
                return <ConsentTextArea handleChange={(name) => this.handleName(name)}/>;
            } else {
                return <ConsentTextArea handleChange={(date) => this.handleDate(date)}/>;
            }
        } else {
            if (this.props.nameText === 'Name of Participant') {
                return this.props.participant[index];
            } else {
                return this.props.personObtaining[index];
            }
        }
    }


    render() {
        console.log(this.props.participant)
        return (
            <table className={'consent-table'}>
                <tbody>
                    <tr>
                        <td className="name-td">
                            {this.displayConsentAreaText(0)}
                        </td>
                        <td className="signature-td">

                        </td>
                        <td className="date-td">
                            {this.displayConsentAreaText(1)}
                        </td>
                    </tr>
                    <tr>
                        <td class="name-td">
                            <div class="doc-border-top">{this.props.nameText}</div>
                        </td>
                        <td class="signature-td">
                            <div class="doc-border-top"> Signature </div>
                        </td>
                        <td class="date-td"> <div class="doc-border-top"> Date </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        )

    }
}

export default ConsentTable;

