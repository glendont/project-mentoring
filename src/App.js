import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Footer from "./components/layout/Footer"
import NavigationBar from "./components/layout/NavigationBar";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import Amplify, { Analytics } from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const analyticsConfig = {
  AWSPinpoint: {
        // Amazon Pinpoint App Client ID
        appId: '92b9767edd52490eacfcec33d579485e',
        // Amazon service region
        region: 'us-east-1',
        mandatorySignIn: false,
  }
}

Analytics.configure(analyticsConfig)

const App = () => {
  return (
    <Fragment>
    <Router>
      <NavigationBar/>
      <Switch>
         <Route exact path="/home" component={Home} />
         <Route exact path="/about" component={About} />
        <Route component={Home} />
      </Switch>
      <Footer/> 
    </Router>
  </Fragment>
  );
}
export default App;;
