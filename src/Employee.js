import Employees from './Employees';
import Error from './Error';
import Loading from './Loading';
import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

export const employeeQuery = gql`
  query employee($id: ID!) {
    employee(where: { id: $id }) {
      firstName
      lastName
      phoneNumber
      email
      title
      bio
    }
  }
`;

export default class Employee extends Component {
  render() {
    return (
      <Fragment>
        <div className="fixed overflow-scroll pin-l pin-b lg:pin-none lg:pin-r lg:pin-t bg-white h-auto lg:h-full w-full lg:w-1/3 p-6 border-grey-light border-t lg:border-0 lg:border-l shadow">
          <Link
            to="/"
            className="text-grey-dark hover:text-white font-light no-underline absolute pin-t pin-r mr-6 mt-6 bg-grey-light hover:bg-purple py-1 px-3 rounded">
            x
          </Link>
          <Query
            query={employeeQuery}
            variables={{ id: this.props.match.params.id }}>
            {({ loading, error, data }) => {
              if (loading) return <Loading />;
              if (error) return <Error />;

              const {
                firstName,
                lastName,
                phoneNumber,
                email,
                title,
                bio,
              } = data.employee;

              return (
                <Fragment>
                  <div className="text-center bg-grey-lightest border-b border-grey-light py-6 -mt-6 -mx-6 mb-6 hidden lg:block">
                    <img
                      alt={lastName}
                      className="rounded-full w-64 h-64 border-4 border-grey-light"
                      src={`https://s3.amazonaws.com/starployees/${firstName.toLowerCase()}.jpg`}
                    />
                  </div>
                  <h2>
                    {firstName} {lastName}
                  </h2>
                  <p className="mb-4 italic text-grey-dark">{title}</p>
                  <p>
                    <strong>p:</strong> {phoneNumber}
                  </p>
                  <p>
                    <strong>e:</strong> {email}
                  </p>
                  <h4 className="uppercase bg-blue inline-block text-white my-4 px-4 py-2 rounded text-xs">
                    Bio
                  </h4>
                  <p className="leading-normal">{bio}</p>
                </Fragment>
              );
            }}
          </Query>
        </div>
        <div className="lg:w-2/3">
          <Employees
            {...Object.assign({}, this.props, {
              activeId: this.props.match.params.id,
            })}
          />
        </div>
      </Fragment>
    );
  }
}
