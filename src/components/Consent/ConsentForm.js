import React, { Component } from 'react';
import '../Forms/Forms.css';
import ImageHeader from "./ImageHeader";
import ConsentText from "./ConsentText";
import {Button, ButtonToolbar} from "react-bootstrap";
import {withRouter} from "react-router";

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
    };

    push() {
        this.props.history.push('/form/' + this.props.formName)
    }

    render() {
        return (
            <div>
                <ButtonToolbar/>
                    <Button media="print" className={'no-print'} variant="primary" onClick={() => window.print()} >Save</Button>
                    <Button media="print" className={'no-print'} variant="secondary" onClick={this.push.bind(this)} >Go Back</Button>
                 <ButtonToolbar/>
                <div id='consent-form-container' className={'consent-form-container'}>
                    <ImageHeader/>
                    <h6 className={'consent-form-title'}>PATIENT INFORMED CONSENT TO PARTICIPATE IN A RESEARCH STUDY</h6>

                    {this.state.formData.map((form, index) => <ConsentText table={form.table} key={index} numOfRows={form.numOfRows} heading={form.title} text={form.value}/>)}

                </div>
            </div>
        );
    }
}

export default withRouter(ConsentForm);