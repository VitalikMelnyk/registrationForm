import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import {Formiks} from './components/Form/Formik';
import { Introduction } from './components/Form/Introduction';
import { Welcome } from './components/Form/Welcome';
import Dashboard from './components/Form/Dashboard';


export default class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        {/* <SectionForm /> */}
        <Switch>
          <Route exact path="/" component={Introduction} />
          <Route path="/auth" component={Formiks} />
          <Route path="/welcome" component={Welcome} />
          <Route path="/dashboard" component={Dashboard} />
        </Switch>

        {/* <Formiks /> */}
      </Container>
    )
  }
}
