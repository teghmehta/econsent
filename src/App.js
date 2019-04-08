import React, { Component } from 'react';
import './App.css';
import Header from "./components/Header/Header";
import FormTextArea from './components/Forms/FormTextArea'
import FormsContainer from "./components/Forms/FormsContainer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <FormsContainer/>
      </div>
    );
  }
}

export default App;
