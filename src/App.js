import React from "react";
import { Switch, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { Form } from "./containers/Form/Form";
import { Dashboard } from "./containers/Dashboard/Dashboard";

import "./App.scss";

const App = props => {
  return (
    <Container fluid={true} className="no-gutters">
      <Switch>
        <Route exact path="/" component={Form} />
        <Route path="/dashboard" component={Dashboard} />
      </Switch>
    </Container>
  );
};

export default App;
