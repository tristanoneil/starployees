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
        <div className="fixed lg:absolute pin-l pin-b lg:pin-none lg:pin-r lg:pin-t bg-white h-auto lg:h-full w-full lg:w-1/3 p-6 border-grey-light border-t lg:border-0 lg:border-l text-center opacity-75">
          <Query
            query={employeeQuery}
            variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading</p>;
              if (error) return <Error />;
              return (
                <h2>
                  {data.employee.firstName} {data.employee.lastName}
                </h2>
              );
            }}
          </Query>
        </div>
        <div className="lg:w-2/3">
          <Employees />
        </div>
      </Fragment>
    );
  }
}
