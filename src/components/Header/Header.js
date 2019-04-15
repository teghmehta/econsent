import React, { Component } from 'react';
import './Header.css';
import {Link} from "react-router-dom";
import {Button, ButtonToolbar} from "react-bootstrap";
// import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div onClick={this.props.handleShow} className={'logo-div'}>
                    <img src={require("../../res/ehealth-logo.png")} alt={'ehealth-logo'} className="logo"/>
                </div>
                <div className={'title-div'}>
                    <h1 className={"title"}>{this.props.formName ? "eConsent - " + this.props.formName : "eConsent"}</h1>
                </div>
                <div className={'spacer-div'}>
                </div>
            </div>
        );
    }
}

export default Header;
