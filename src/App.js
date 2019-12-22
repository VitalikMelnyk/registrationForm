import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import {Formiks} from './components/Form/Formik';


export default class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        {/* <SectionForm /> */}
        <Formiks />
      </Container>
    )
  }
}
