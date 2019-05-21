import React, { Component } from 'react';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div onClick={this.props.handleShow} className={'logo-div'}>
                    <img src={require("../../res/ehealth-logo.png")} alt={'ehealth-logo'} className="logo"/>
                </div>
                <div className={'title-div'}>
                    <h1 className={"title"}>{this.props.formName ? (this.props.formName.length > 30 ? this.props.formName.substring(0, Math.min(this.props.formName.length, 70)) + '...' : this.props.formName) : "eConsent"}</h1>
                </div>
                <div className={'spacer-div'}>
                   {this.props.savingText}
                </div>
            </div>
        );
    }
}

export default Header;
