import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


class FormTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: '',
            isValidated: undefined,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({formValue: this.props.formValue });
        if (this.props.isFillInTheBlank) {
            this.setState({isValidated: false})
        } else {
            this.setState({isValidated: undefined})
        }
    }

    handleChange(text) {
        this.setState({formValue: text});

        if (text.replace(/\s/g, '').indexOf("<strong>X</strong>") === -1 && this.state.isValidated !== undefined) { //If the fill in the blank doesn't exist
            this.setState({isValidated: true});

            try {
                this.props.changeValue(text, this.props.index, true);
            } catch (e) {

            }
        } else {
            this.setState({isValidated: false});

            try {
                this.props.changeValue(text, this.props.index, this.state.isValidated);
            } catch (e) {

            }
        }
    }

    render() {
        //
        // if (this.props.numOfRows <= 1) {
        //     return (
        //             <Form.Group as={Row} controlId="">
        //                 <Form.Label column sm="2">
        //                     {this.props.formTitle}
        //                 </Form.Label>
        //                 <Col sm="10">
        //                     <Form.Control required type="textarea" placeholder={this.props.placeholder} value={this.state.formValue} onChange={e => this.handleChange(e.target.value)}/>
        //                     <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        //                 </Col>
        //             </Form.Group>
        //     );
        // } else {
        //     return (
        //             <Form.Group as={Row} controlId="exampleForm.ControlTextarea1">
        //                 <Form.Label column sm="2">{this.props.formTitle}</Form.Label>
        //                 <Col sm="10">
        //                     <Form.Control className={'text-area'} as="textarea"
        //                                   placeholder={this.props.placeholder}
        //                                   rows={this.props.numOfRows}
        //                                   required
        //                                   value={this.state.formValue}
        //                                   onChange={e => this.handleChange(e.target.value, this.props.index)}
        //                     />
        //                     <Form.Control.Feedback type="invalid">Required</Form.Control.Feedback>
        //                 </Col>
        //             </Form.Group>
        //     );
        // }
        return (

            <div className={"editorContainer"}>
                <Form.Label>
                    {this.props.formTitle}
                </Form.Label>
                <ReactQuill
                    onChange={this.handleChange}
                    value={this.state.formValue}
                    modules={FormTextArea.modules}
                    formats={FormTextArea.formats}z
                    bounds={'.editorContainer'}
                    placeholder={this.props.placeholder}
                />
            </div>
        )

    }
}

FormTextArea.modules = {
    toolbar: [
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike',],
        [{'list': 'ordered'}, {'list': 'bullet'}],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
FormTextArea.formats = [
    'header', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
];

export default FormTextArea;
