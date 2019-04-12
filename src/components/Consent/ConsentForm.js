import React, { Component } from 'react';
import '../Forms/Forms.css';
import ImageHeader from "./ImageHeader";
import ConsentText from "./ConsentText";

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

            </div>
        );
    }
}

export default ConsentForm;