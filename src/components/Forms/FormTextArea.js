import React, { Component } from 'react';
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

class FormTextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValue: '',
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.setState({formValue: this.props.formValue })
    }

    handleChange(text) {
        this.setState({formValue: text});
        console.log(text)
        try {
            this.props.changeValue(text, this.props.index);
        } catch (e) {

        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return this.state.formValue !== nextState.formValue;
    }

    render() {
        return (
            <ReactQuill
                onChange={this.handleChange}
                value={this.state.formValue}
                modules={FormTextArea.modules}
                formats={FormTextArea.formats}
                bounds={'.editorContainer'}
                placeholder={this.props.placeholder}
            />
        )

    }
}

FormTextArea.modules = {
    toolbar: [
        [{size: []}],
        ['bold', 'italic', 'underline'],
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
    'list', 'bullet', 'indent', 'code-block',
];

export default FormTextArea;
