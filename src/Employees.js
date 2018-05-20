import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
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
                <Link
                  to={`/employees/${id}`}
                  className="px-3 w-full lg:w-1/3 no-underline text-black"
                  key={id}>
                  <div className="rounded shadow-md mb-6 bg-white hover:bg-purple hover:text-white">
                    <div className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-16">
                          <img
                            alt={lastName}
                            className="rounded-full border-4 border-grey-light"
                            src={`https://s3.amazonaws.com/starployees/${firstName.toLowerCase()}.jpg`}
                          />
                        </div>
                        <div className="w-auto pl-4 font-bold text-xl">
                          {firstName} {lastName}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          );
        }}
      </Query>
    );
  }
}
