import React, { Component } from 'react';
import { SectionForm } from './components/Form/SectionForm';
import Container from 'react-bootstrap/Container';

export default class App extends Component {
  render() {
    return (
      <Container fluid={true}>
        <SectionForm />
      </Container>
    )
  }
}
