import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import ConsentTextArea from "./ConsentTextArea";
import DatePicker from "react-datepicker";
import SignatureCanvas from "react-signature-canvas";
import Image from "react-bootstrap/Image";
import {Form} from "react-bootstrap";
class ConsentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: new Date(),
            validated: false
        };

        this.handleDate(this.state.date);
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    handleDate(date) {
        this.setState({date});
        this.props.changeNameDateArray(date)
    }


    displayConsentAreaText(index) {
        if (!this.props.isFinal) {
            if (index === 0) {
                return <ConsentTextArea label={this.props.nameText} handleChange={(name) => this.props.changeNameDateArray(name)}/>;
            } else {
                return <DatePicker
                    className={'consent-date-picker'}
                    selected={this.state.date}
                    onChange={(date) => this.handleDate(date)}
                />
            }
        } else {
            if (this.props.nameText === 'Name of Participant') {
                return this.props.participant[index];
            } else {
                return this.props.personObtaining[index];
            }
        }
    }

    trim = () => {
        this.setState({trimmedDataURL: this.sigPad.getTrimmedCanvas()
                .toDataURL('image/png')})
    };

    isEmpty() { return this.sigPad.isEmpty();}


    render() {
        console.log(this.props.participant);

        if (!this.props.isFinal) {
            return (
                <div className={'isNotFinal-div'}>
                    <div className={'table-div name-div'}>{this.displayConsentAreaText(0)}</div>
                    <div className={'table-div sig-div'}><Form.Label>Signature</Form.Label><SignatureCanvas ref={(ref) => {this.sigPad = ref;}} penColor='black' canvasProps={{height: 200, className: 'sigCanvas'}} /></div>
                    <div className={'table-div date-div'}><Form.Label>Date</Form.Label>{this.displayConsentAreaText(1)}</div>
                </div>
            )
        } else {
            return (
                <table className={'consent-table'}>
                    <tbody>
                    <tr>
                        <td className="name-td">
                            {this.displayConsentAreaText(0)}
                        </td>
                        <td className="signature-td">
                            <Image src={this.state.trimmedDataURL}/>
                        </td>
                        <td className="date-td">
                            {this.displayConsentAreaText(1)}
                        </td>
                    </tr>
                    <tr>
                        <td className="name-td">
                            <div className="doc-border-top">{this.props.nameText}</div>
                        </td>
                        <td className="signature-td">
                            <div className="doc-border-top"> Signature </div>
                        </td>
                        <td className="date-td"> <div className="doc-border-top"> Date </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
            )
        }


    }
}

export default ConsentTable;

