import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Formiks} from './containers/Formik/Formik';
import { Introduction } from './containers/Introduction/Introduction';
import { Welcome } from './containers/Welcome/Welcome';
import Dashboard from './containers/Dashboard/Dashboard';


export default class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/auth" component={Formiks} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>
      </Container>
    )
  }
}
