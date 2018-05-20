import Employees from './Employees';
import Error from './Error';
import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const employeeQuery = gql`
  query employee($id: ID!) {
    employee(where: { id: $id }) {
      id
      firstName
      lastName
    }
  }
`;

export default class Employee extends Component {
  render() {
    return (
      <Fragment>
        <Query
          query={employeeQuery}
          variables={{ id: this.props.match.params.id }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            if (error) return <Error />;
            return (
              <h1 className="mb-3">
                {data.employee.firstName} {data.employee.lastName}
              </h1>
            );
          }}
        </Query>
        <Employees />
      </Fragment>
    );
  }
}
