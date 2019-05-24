import React, { Component } from 'react';
import '../Forms/Forms.css';
import {Button, ButtonToolbar} from "react-bootstrap";
import DatePicker from "react-datepicker";

class BtnToolbar extends Component {

    render() {
        return (
            <div id={'btn-toolbar-container'}>
                <ButtonToolbar>
                    <Button onClick={() => this.props.saveJson()} variant="primary">Save</Button>
                    <Button variant="secondary" onClick={() => this.props.handleShow()} >Go Back</Button>
                    <Button onClick={() => this.props.showDuplicateModal()} variant="outline-info">Duplicate Form</Button>
                    <Button type={"submit"} variant="outline-danger">Save and Submit</Button>
                    <h6 className={'date-picker-header'}>Informed Consent Form Version Date:</h6>
                    <DatePicker
                        selected={this.props.startDate}
                        onChange={(date) => this.props.handleDateSelect(date)}
                    />
                </ButtonToolbar>
            </div>
        )
    }
}

export default BtnToolbar;