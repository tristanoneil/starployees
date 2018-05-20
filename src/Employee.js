import React, { Component, Fragment } from 'react';
import Employees from './Employees';

export default class Employee extends Component {
  render() {
    return (
      <Fragment>
        <h1>{this.props.match.params.id}</h1>
        <Employees />
      </Fragment>
    );
  }
}
