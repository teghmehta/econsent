import React, { Component } from 'react';
import './App.css';
import FormTextArea from './components/Forms/FormTextArea'
import FormsContainer from "./components/Forms/FormsContainer";
import ConsentForm from "./components/Consent/ConsentForm";

class App extends Component {
  render() {
    return (
      <div className="App">
        <FormsContainer/>
        {/*<ConsentForm/>*/}
      </div>
    );
  }
}

export default App;
