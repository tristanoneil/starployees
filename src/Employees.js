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

          return (
            <div className="flex flex-wrap md:-mx-3">
              {data.employees.map(({ id, firstName, lastName }) => (
                <div key={id} className="px-3 w-full lg:w-1/3 cursor-pointer">
                  <div className="rounded shadow-md mb-6 bg-white hover:bg-purple hover:text-white">
                    <div className="px-6 py-4">
                      {firstName} {lastName}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
