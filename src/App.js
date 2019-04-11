import React, { Component } from 'react';
import './App.css';
import FormTextArea from './components/Forms/FormTextArea'
import FormsContainer from "./components/Forms/FormsContainer";
import ConsentForm from "./components/Consent/ConsentForm";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import StartupForm from "./components/Consent/StartupForm";

class App extends Component {


    render() {
    return (
        <BrowserRouter>
          <div>
            <Switch>
              <Route exact path={"/"} component={StartupForm}/>
              <Route exact path ={"/new"}   render={(props)=> <FormsContainer/>}/>
              <Route exact path ={"/submit"}   render={(props)=> <ConsentForm/>}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
