import React, { Component } from 'react';
import '../Forms/Forms.css';
import {Row, Col, Image} from "react-bootstrap";

class ImageHeader extends Component {

    render() {
        console.log(this.props.pictures);
        return (
            <div className={'image-header-container'}>
                <Row>
                    <Col/>
                    <Col>
                        <Image className={'uhn-consent-logo'} src={require('../../res/UHN.png')}/>
                    </Col>

                    <Col>
                        <Image className={'ehi-consent-logo'} src={require('../../res/ehealth-logo.png')}/>
                    </Col>
                    <Col/>
                </Row>
            </div>
        );
    }
}

export default ImageHeader;