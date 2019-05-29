import React, { Component } from 'react';
import '../Forms/Forms.css';
import ImageHeader from "./ImageHeader";
import ConsentText from "./ConsentText";
import {Button, ButtonToolbar} from "react-bootstrap";
import {withRouter} from "react-router";
import ConsentTable from "./ConsentTable";

class ConsentForm extends Component {

    constructor (props) {
        super(props);
        this.state = {formData: [], participant: ["", ""], personObtaining: ["", ""], isFinal: false}
    }

    componentWillMount () {
        this.loadJson()
    }


    loadJson = () => {
        const json = window.localStorage.getItem(this.props.formName + ' - ' + new Date(Date.parse(this.props.date)).toDateString().split(' ').slice(1).join(' '));

        console.log('ConsentForm', JSON.parse(json));

        this.setState({formData: JSON.parse(json)});


    };

    getFileArrFromBase64Images(base64Images, base64FileNames) {
        let ImageArray = [];
        ImageArray.push(base64Images.map((base64Picture, index) => {
            let name = base64FileNames[index];
            const byteString = atob(base64Picture.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i += 1) {
                ia[i] = byteString.charCodeAt(i);
            }
            const newBlob = new Blob([ab], {
                type: 'image/jpeg',
            });
            var file = new File([newBlob], name, {type: 'image/png', lastModified: Date.now()});
            console.log(file)
            return file;
        }));
        return ImageArray
    }

    push() {
        this.props.history.push('/form/' + this.props.formName + '/' + this.props.date)
    }

    changeTableValues(property, value, index) {
        console.log(property, value);
        let propertArr = this.state[property];
        propertArr[index] = value;
        this.setState({[property]: propertArr})
    }

    submitTextFields() {
        // let formData = this.state.formData;
        // let nameOfParticpatingIndex = this.state.formData.findIndex(form => form.value === 'Name of Participant');
        // let nameOfPersonObtainingIndex = this.state.formData.findIndex(form => form.value === 'Name of Person obtaining consent (print)');
        // console.log(formData[nameOfParticpatingIndex], formData[nameOfPersonObtainingIndex])
        // formData[nameOfParticpatingIndex].name = this.state.participant[0];
        // formData[nameOfParticpatingIndex].consentDate = this.state.participant[1];
        // formData[nameOfPersonObtainingIndex].name = this.state.personObtaining[0];
        // formData[nameOfPersonObtainingIndex].consentDate = this.state.personObtaining[1];
        // let validJson;
        // validJson = this.validateJson(JSON.stringify(formData));
        // if (!validJson) {
        //     return;
        // }
        // window.localStorage.setItem(
        //     this.props.formName + ' - ' + new Date(Date.parse(this.props.date)).toDateString().split(' ').slice(1).join(' '),
        //     validJson
        // );
        // this.props.history.push('/submit/' + encodeURIComponent(this.props.formName) + '/' + encodeURIComponent(this.props.date) + '/' + encodeURIComponent('true'))
        this.setState({isFinal: true})
    }

    render() {
        if (this.state.formData === null || this.state.formData.length === 0) {
            return (
                <div id='consent-form-container' className={'consent-form-container'}>
                    <h3>This form hasn't been created yet. Go back to the Main Menu</h3>
                    <Button media="print" className={'no-print'} variant="secondary" onClick={()=>this.props.history.push('/')} >Go Back</Button>
                </div>
            )
        } else {
            return (
                <div>
                    <ButtonToolbar/>
                    <Button media="print" className={'no-print'} variant="primary" onClick={() => window.print()} >Save</Button>
                    <Button media="print" className={'no-print'} variant="secondary" onClick={this.push.bind(this)} >Go Back</Button>
                    <Button media="print" className={'no-print'} variant="danger" onClick={() => this.submitTextFields()}>Submit</Button>
                    <ButtonToolbar/>
                    <div id='consent-form-container' className={'consent-form-container'}>
                        <table>
                            <thead>
                            <tr>
                                <td>
                                </td>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>
                                    <div className="content">
                                        <ImageHeader  base64Images={this.state.formData.find(x => x.base64Images).base64Images}
                                                      pictures={this.getFileArrFromBase64Images(this.state.formData.find(x => x.base64Images).base64Images, this.state.formData.find(x => x.base64FileNames).base64FileNames)}
                                                      base64FileNames={this.state.formData.find(x => x.base64FileNames).base64FileNames}/>
                                        <h6 className={'consent-form-title'}>PATIENT INFORMED CONSENT TO PARTICIPATE IN A RESEARCH STUDY</h6>

                                        {this.state.formData.map((form, index) => {
                                            let replacedItem = form.value.replace(/\s/g, '').replace('<br>', '');
                                            if (form.isValidated === undefined && (replacedItem === '<p></p>' || replacedItem === '')) return '';

                                            else if (form.table) return <ConsentTable changeParticipantName={(name) => this.changeTableValues('participant', name, 0)} changePersonObtainingName={(name) => this.changeTableValues('personObtaining', name, 0)}
                                                                                      changeParticipantDate={(name) => this.changeTableValues('participant', name, 1)} changePersonObtainingDate={(date) => this.changeTableValues('personObtaining', date, 1)}
                                                                                      nameText={form.value} isFinal={this.state.isFinal} participant={this.state.participant} personObtaining={this.state.personObtaining} />;

                                            else return <ConsentText table={form.table} key={index} numOfRows={form.numOfRows} heading={form.title} text={form.value}/>
                                        })}
                                    </div>
                                </td>
                            </tr>
                            </tbody>
                            <tfoot>
                            <tr>
                                <td className={'footer-td'}>
                                    <div className="footer">
                                        <p className={'print-header'}>Version Date:  {new Date(Date.parse(this.state.formData.find(x => x.date).date)).toDateString().split(' ').slice(1).join(' ')}</p>
                                    </div>
                                </td>
                            </tr>
                            </tfoot>
                        </table>

                    </div>
                </div>
            );
        }
    }
}

export default withRouter(ConsentForm);