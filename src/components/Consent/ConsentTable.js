import React, { Component } from 'react';
import 'react-quill/dist/quill.snow.css';
import ConsentTextArea from "./ConsentTextArea";
import DatePicker from "react-datepicker";
import SignatureCanvas from "react-signature-canvas";
import Image from "react-bootstrap/Image";
class ConsentTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            date: new Date(),
            validated: false
        };

        this.handleName = this.handleName.bind(this);
        this.handleDate = this.handleDate.bind(this);
        this.displaySignature = this.displaySignature.bind(this);
        this.handleDate(this.state.date);
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    handleName(name) {
        if (this.props.nameText === 'Name of Participant') {
            this.props.changeParticipantName(name);
        } else {
            this.props.changePersonObtainingName(name);
        }
    }

    handleDate(date) {
        this.setState({date});
        date = date.toDateString().split(' ').slice(1).join(' ');
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
                return <DatePicker
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
    }

    displaySignature() {
        if (!this.props.isFinal) {
            return  <SignatureCanvas ref={(ref) => {this.sigPad = ref;}} penColor='black' canvasProps={{width: 500, height: 200, className: 'sigCanvas'}} />
        } else {
            return <Image src={this.state.trimmedDataURL}/>;
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
                            {this.displaySignature()}
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

export default ConsentTable;

