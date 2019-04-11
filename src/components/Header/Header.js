import React, { Component } from 'react';
import './Header.css';
// import {Link} from "react-router-dom";

class Header extends Component {
    render() {
        return (
            <div className="header">
                <div className={'logo-div'}>
                    <img src={require("../../res/ehealth-logo.png")} alt={'ehealth-logo'} className="logo"/>
                </div>
                <div className={'title-div'}>
                    <h1 className={"title"}>eConsent</h1>
                </div>
                <div className={'spacer-div'}>
                </div>
            </div>
        );
    }
}

export default Header;
