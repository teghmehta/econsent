import React, { Component } from 'react';
import '../Forms/Forms.css';

class ConsentText extends Component {

    render() {
        if (this.props.numOfRows <= 2) {
            return (
                <div className={'text-container singleline-container'}>
                    <p className={'singleline-heading'}>{this.props.heading}</p>
                    <div dangerouslySetInnerHTML={{__html: this.props.text}} className={'singleline-text'}/>
                </div>
            );
        } else {
            return (
                <div className={'text-container multiline-container'}>
                    <p className={'multiline-heading'}>{this.props.heading}</p>
                    <div dangerouslySetInnerHTML={{__html: this.props.text}} className={'multiline-text'}/>
                </div>
            );
        }
    }
}

export default ConsentText;