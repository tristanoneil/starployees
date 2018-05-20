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
      phoneNumber
      email
      bio
    }
  }
`;

export default class Employee extends Component {
  render() {
    return (
      <Fragment>
        <div className="fixed lg:absolute pin-l pin-b lg:pin-none lg:pin-r lg:pin-t bg-white h-auto lg:h-full w-full lg:w-1/3 p-6 border-grey-light border-t lg:border-0 lg:border-l opacity-75 shadow">
          <Query
            query={employeeQuery}
            variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return <p>Loading</p>;
              if (error) return <Error />;
              return (
                <Fragment>
                  <h2 className="mb-4">
                    {data.employee.firstName} {data.employee.lastName}
                  </h2>
                  <hr className="border-b border-grey-light my-4" />
                  <p>
                    <strong>p:</strong> {data.employee.phoneNumber}
                  </p>
                  <p>
                    <strong>e:</strong> {data.employee.email}
                  </p>
                  <h4 className="uppercase bg-blue inline-block text-white my-4 px-4 py-2 rounded text-xs">
                    Bio
                  </h4>
                  <p className="leading-normal">{data.employee.bio}</p>
                </Fragment>
              );
            }}
          </Query>
        </div>
        <div className="lg:w-2/3">
          <Employees {...this.props} />
        </div>
      </Fragment>
    );
  }
}
