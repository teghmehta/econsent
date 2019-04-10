import React, { Component } from 'react';
import '../Forms/Forms.css';
import {ButtonToolbar, Button, Container, Row, Col, Image} from "react-bootstrap";

class SingleLineText extends Component {

    render() {
        return (
            <div className={'text-container singleline-container'}>
                <h6 className={'singleline-heading'}>{this.props.heading}</h6>
                <p className={'singleline-text'}>{this.props.text}</p>
            </div>
        );
    }
}

export default SingleLineText;