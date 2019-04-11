import React, { Component } from 'react';
import '../Forms/Forms.css';

class ConsentText extends Component {

    render() {
        if (this.props.numOfRows <= 2) {
            return (
                <div className={'text-container singleline-container'}>
                    <p className={'singleline-heading'}>{this.props.heading}</p>
                    <p className={'singleline-text'}>{this.props.text}</p>
                </div>
            );
        } else {
            return (
                <div className={'text-container multiline-container'}>
                    <p className={'multiline-heading'}>{this.props.heading}</p>
                    <p className={'multiline-text'}>{this.props.text}</p>
                </div>
            );
        }
    }
}

export default ConsentText;