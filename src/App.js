import React, { Component } from 'react';
import './App.css';
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
              <Route exact path ={"/form/:formName"} render={(props)=> <FormsContainer formName={decodeURIComponent(props.match.params.formName)}/>}/>
              <Route exact path ={"/submit/:formName"}   render={(props)=> <ConsentForm formName={decodeURIComponent(props.match.params.formName)}/>}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
