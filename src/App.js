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
              <Route exact path ={"/form/:formName/:date"} render={(props)=> <FormsContainer formName={decodeURIComponent(props.match.params.formName)} date={decodeURIComponent(props.match.params.date)}/>}/>
              <Route exact path ={"/submit/:formName/:date/:final"}   render={(props)=> <ConsentForm formName={decodeURIComponent(props.match.params.formName)} date={decodeURIComponent(props.match.params.date)} isFinal={decodeURIComponent(props.match.params.final)}/>}/>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
