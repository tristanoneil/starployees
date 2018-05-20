import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

export const employeesQuery = gql`
  {
    employees(orderBy: lastName_ASC) {
      id
      firstName
      lastName
    }
  }
`;

export default class Employees extends Component {
  render() {
    return (
      <ul>
        <Query query={employeesQuery}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            if (error)
              return (
                <h1>
                  Sorry, there was an error.
                  <span role="img" aria-label="Sobbing Face" className="pl-3">
                    😭
                  </span>
                </h1>
              );

            return data.employees.map(({ id, firstName, lastName }) => (
              <li key={id}>
                {firstName} {lastName}
              </li>
            ));
          }}
        </Query>
      </ul>
    );
  }
}
