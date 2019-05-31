import React, { Component } from 'react';
import '../Forms/Forms.css';
import ImageHeader from "./ImageHeader";
import ConsentText from "./ConsentText";
import {Button, ButtonToolbar} from "react-bootstrap";
import {withRouter} from "react-router";
import ConsentTable from "./ConsentTable";
import {toast, ToastContainer} from "react-toastify";
const options = {
    autoClose: 2000,
    hideProgressBar: true,
};

class ConsentForm extends Component {

    constructor (props) {
        super(props);
        this.state = {formData: [], participant: ["", ""], personObtaining: ["", ""], isFinal: false, sigPadRefNames: []}
    }

    componentWillMount () {
        this.loadJson()
    }


    loadJson = () => {
        const json = window.localStorage.getItem(this.props.formName + ' - '
            + new Date(Date.parse(this.props.date)).toDateString().split(' ').slice(1).join(' '));

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

    changeTableValues(value, nameText) {
        let property, index;
        if (nameText === 'Name of Participant') property = 'participant';
        else property = 'personObtaining';

        if (value instanceof Date) {
            index = 1;
            value = value.toDateString().split(' ').slice(1).join(' ');
        } else index = 0;

        let propertArr = this.state[property];
        propertArr[index] = value;
        this.setState({[property]: propertArr})
    }

    areTableArraysNotValid() {
        console.log(this.state.personObtaining[0].length, this.state.participant[0].length);
        let poL = this.state.personObtaining[0].length;
        let paL =  this.state.participant[0].length;
        let doesOnlyContainFirstName = this.state.personObtaining[0].split(' ').length === 1 || this.state.participant[0].split(' ').length === 1;
        return poL === 0 || poL > 50 || paL === 0 || paL > 50 || doesOnlyContainFirstName;
    }

    submitTextFields() {
        let isEmpty, areTableArraysValid;
        this.state.sigPadRefNames.map((item) => {
            console.log(item)
            try {
                isEmpty = this[item].isEmpty();
                areTableArraysValid = this.areTableArraysNotValid();
                if (!isEmpty && !areTableArraysValid) {
                    this[item].trim();
                }
            }catch (e) {
                console.log(e)
            }
        });
        if (isEmpty) {
            toast.warn("Please Sign Below", options)
        } else if (areTableArraysValid) {
            toast.warn("Please enter a valid name.", options)
        } else {
            this.setState({isFinal: true})
        }
    }

    setConsentTableSigPadRefs(item,ref) {
        console.log(item)
        this[item] = ref;
        let sigArray = this.state.sigPadRefNames;
        sigArray.push(item);
        this.setState({sigPadRefNames: sigArray})
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
                    <ToastContainer />
                    <ButtonToolbar/>
                    <Button media="print" className={'no-print'} variant="primary" onClick={() => window.print()} >Save</Button>
                    <Button media="print" className={'no-print'} variant="secondary" onClick={this.push.bind(this)} >Go Back</Button>
                    <Button media="print" className={'no-print'} variant="danger" onClick={() => this.submitTextFields()}>Submit</Button>
                    <ButtonToolbar/>
                    <div id='consent-form-container' className={'consent-form-container'}>
                        <table className={'consent-content-table-block'}>
                            <thead>
                            <tr >
                                <td>
                                </td>
                            </tr>
                            </thead>
                            <tbody className={'consent-content-table-block'}>
                            <tr className={'consent-content-table-block'}>
                                <td className={'consent-content-table-block'}>
                                    <div className="content">
                                        <ImageHeader  base64Images={this.state.formData.find(x => x.base64Images).base64Images}

                                                      pictures={this.getFileArrFromBase64Images(this.state.formData.find(x => x.base64Images).base64Images,
                                                          this.state.formData.find(x => x.base64FileNames).base64FileNames)}

                                                      base64FileNames={this.state.formData.find(x => x.base64FileNames).base64FileNames}/>

                                        <h6 className={'consent-form-title'}>PATIENT INFORMED CONSENT TO PARTICIPATE IN A RESEARCH STUDY</h6>

                                        {this.state.formData.map((form, index) => {
                                            let replacedItem = form.value.replace(/\s/g, '').replace('<br>', '');
                                            if (form.isValidated === undefined && (replacedItem === '<p></p>' || replacedItem === '')) return '';

                                            else if (form.table) return <ConsentTable
                                                                                      changeNameDateArray={(value) => this.changeTableValues(value, form.text)}
                                                                                      key={index}
                                                                                      onRef={(ref) => this.setConsentTableSigPadRefs('consentTable'+index, ref)}
                                                                                      sigPadImage={this.state.sigPad}
                                                                                      nameText={form.text} isFinal={this.state.isFinal}
                                                                                      participant={this.state.participant}
                                                                                      personObtaining={this.state.personObtaining} />;

                                            else return <ConsentText isFinal={this.state.isFinal} participantName={this.state.participant[0]} table={form.table} key={index} numOfRows={form.numOfRows} heading={form.title} text={form.value}/>
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