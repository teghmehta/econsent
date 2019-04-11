import React, { Component } from 'react';
import Header from "../Header/Header";
import {Button, ButtonToolbar} from "react-bootstrap";
import {Link} from "react-router-dom";
// import {Link} from "react-router-dom";

class StartupForm extends Component {
    render() {
        return (
            <div className="startup-container">
                <Header/>
                <div className={'forms-container'}>
                    <ButtonToolbar>
                        <Link to={"/new"}><Button variant="primary">New Form</Button></Link>
                            <Button variant="secondary" >Open Form</Button>
                    </ButtonToolbar>
                </div>
            </div>
        );
    }
}

export default StartupForm;
