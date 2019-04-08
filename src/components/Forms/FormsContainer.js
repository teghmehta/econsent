import React, { Component } from 'react';
import FormTextArea from "./FormTextArea";
import FormSingleLine from "./FormSingleLine";
import FormDoubleLine from "./FormDoubleLine";
import './Forms.css';
import {ButtonToolbar, Button} from "react-bootstrap";

class FormsContainer extends Component {
    render() {
        return (
            <div className={'forms-container'}>
                <FormSingleLine formTitle={'Study Title:'} placeholder={'Add Study Title'}/>
                <FormSingleLine formTitle={'Principal Investigator:'} placeholder={'Add Principal Investigator'}/>
                <FormSingleLine formTitle={'Funder:'} placeholder={'Add Funder'}/>
                <FormSingleLine formTitle={'Co-Investigators:'} placeholder={'Add Co-Investigators'}/>
                <FormTextArea formTitle={'INFORMED CONSENT'} numOfRows={9}/>
                <FormTextArea formTitle={'INTRODUCTION'} numOfRows={4}/>
                <FormTextArea formTitle={'WHY IS THIS STUDY BEING DONE?'} numOfRows={4}/>
                <FormTextArea formTitle={'WHAT IS THE USUAL TREATMENT?'} numOfRows={4}/>
                <FormTextArea formTitle={'WHAT WILL HAPPEN DURING THIS STUDY?'} numOfRows={4}/>
                <FormTextArea formTitle={'HOW MANY PEOPLE WILL TAKE PART IN THIS STUDY?'} numOfRows={4}/>
                <FormTextArea formTitle={'WHAT ARE THE RESPONSIBILITIES OF STUDY PARTICIPANTS?'} numOfRows={4}/>
                <FormTextArea formTitle={'WHAT ARE THE RISKS OR HARMS OF PARTICIPATING IN THIS STUDY?'} numOfRows={4}/>
                <FormTextArea formTitle={'WHAT ARE THE RISKS OR HARMS OF PARTICIPATING IN THIS STUDY?'} numOfRows={4}/>
                <FormTextArea formTitle={'CAN PARTICIPATION IN THIS STUDY END EARLY?'} numOfRows={4}/>
                <FormTextArea formTitle={'WHAT HAPPENS IF I HAVE A RESEARCH RELATED INJURY?'} numOfRows={4}/>
                <FormTextArea formTitle={'ARE STUDY PARTICIPANTS PAID TO PARTICIPATE IN THIS STUDY?'} numOfRows={4}/>
                <FormTextArea formTitle={'HOW WILL MY INFORMATION BE KEPT CONFIDENTIAL?'} numOfRows={4}/>
                <FormTextArea formTitle={'ARE THERE ANY CONFLICTS OF INTEREST/RELATIONSHIPS?'} numOfRows={4}/>
                <FormTextArea formTitle={'WHAT ARE THE RIGHTS OF PARTICIPANTS IN A RESEARCH STUDY?'} numOfRows={4}/>
                <FormTextArea formTitle={'DOCUMENTATION OF INFORMED CONSENT'} numOfRows={18}/>
                <FormSingleLine formTitle={'Name of Participant:'}/>
                <ButtonToolbar>
                    <Button variant="primary">Save</Button>
                    <Button variant="secondary">Save and Continue Later</Button>
                    <Button variant="outline-danger">Save and Submit</Button>
                </ButtonToolbar>
            </div>
        );
    }
}

export default FormsContainer;
