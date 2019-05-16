import React, { Component } from 'react';
import '../Forms/Forms.css';
import {Row, Col, Image} from "react-bootstrap";

class ImageHeader extends Component {

    render() {
        console.log(this.props.base64Images, this.props.base64FileNames);

        return (
            <div className={'image-header-container'}>
                <Row>
                    <Col/>
                    {this.props.base64Images.map((img, i ) => {
                        return (
                            <Col key={i}>
                                <Image className={'uhn-consent-logo'} src={img}/>
                            </Col>
                        )

                    })}
                    <Col/>
                </Row>
            </div>
        );
    }
}

export default ImageHeader;