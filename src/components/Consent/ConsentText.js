import React, { Component } from 'react';
import '../Forms/Forms.css';

class ConsentText extends Component {

    render() {
        let text = this.props.text;
        if (this.props.participantName !== "" && text.indexOf("Name of Participant:") && this.props.isFinal)  {
            console.log(text);
            text = text.split("Name of Participant:").join("Name of Participant: " + this.props.participantName)
        }
        let tablePadding = "";
        if (this.props.table)  tablePadding = "tablePadding";
        if (this.props.numOfRows <= 2) {
            return (
                <div className={'text-container singleline-container' + tablePadding}>
                    <p className={'singleline-heading'}>{this.props.heading}</p>
                    <div dangerouslySetInnerHTML={{__html: text}} className={'singleline-text'}/>
                </div>
            );
        } else {
            return (
                <div className={'text-container multiline-container' + tablePadding}>
                    <p className={'multiline-heading'}>{this.props.heading}</p>
                    <div dangerouslySetInnerHTML={{__html: text}} className={'multiline-text'}/>
                </div>
            );
        }
    }
}

export default ConsentText;