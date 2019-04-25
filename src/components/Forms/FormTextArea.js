import React, { Component } from 'react';
import Form from "react-bootstrap/Form";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


class FormTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: '',
            validated: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({formValue: this.props.formValue });
    }

    handleChange(text) {
        this.setState({formValue: text });
        try {
            this.props.changeValue(text, this.props.index);
        } catch (e) {
            
        }
    }

    getFillInTheBlank() {

    }

    render() {
        let title=
            <Form.Label>
                {this.props.formTitle}
            </Form.Label>

        let quillForm =
            <ReactQuill
                onChange={this.handleChange}
                value={this.state.formValue}
                modules={FormTextArea.modules}
                formats={FormTextArea.formats}
                bounds={'.editorContainer'}
                placeholder={this.props.placeholder}
            />;

        let oldFITB = "";
        let FITB = [];
        try {
            oldFITB = this.props.fillInTheBlankField.split("%fill");
            for (let i = 0; i < oldFITB.length; i ++) {
                FITB.push((oldFITB[i]))
                if (i < oldFITB.length -1) {
                    FITB.push((<Form.Control className={'fitb-form'} required type="textarea" placeholder={"3"}/>))
                    console.log(i)
                }
            }

            console.log(FITB)
        } catch (e) {

        }
        let fillInTheBlankField = <div className={"fill-in-the-blank-field"}>{FITB}</div>;
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

        if (this.props.fillInTheBlankField) {
            if (this.props.paragraphOrder === 'fill') {
                //This checks the order. Does static field come first or the form. This basically changes based on which paragraph needs to stay the same
                return (
                    <div className={"editorContainer"}>
                        {title}
                        {fillInTheBlankField}
                        {quillForm}
                    </div>
                )
            } else if (this.props.paragraphOrder === 'value'){
                return (
                    <div className={"editorContainer"}>
                        {title}
                        {quillForm}
                        {fillInTheBlankField}
                    </div>
                )
            } else {
                return (
                    <div className={"editorContainer"}>
                        {title}
                        {fillInTheBlankField}
                    </div>
                )
            }
        } else {
            return (
                <div className={"editorContainer"}>
                    {title}
                    {quillForm}
                </div>
            )
        }
    }
}

FormTextArea.modules = {
    toolbar: [
        [{ 'header': '1'}, {'header': '2'}],
        [{size: []}],
        ['bold', 'italic', 'underline', 'strike',],
        [{'list': 'ordered'}, {'list': 'bullet'},
            {'indent': '-1'}, {'indent': '+1'}],
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
