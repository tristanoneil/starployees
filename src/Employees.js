import Error from './Error';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import qs from 'query-string';

export const employeesQuery = gql`
  query($query: String!) {
    employees(orderBy: lastName_ASC, where: { firstName_contains: $query }) {
      id
      firstName
      lastName
    }
  }
`;

export default class Employees extends Component {
  constructor(props) {
    super(props);

    const query = window.location.search
      ? qs.parse(window.location.search).query
      : '';

    this.state = {
      query,
    };
  }

  handleSearch = event => {
    const query = event.target.value;

    this.setState({
      query,
    });

    this.props.history.push({
      search: `?query=${query}`,
    });
  };

  render() {
    return (
      <div>
        <div className="px-3 md:px-0 mb-8">
          <input
            type="search"
            onChange={this.handleSearch}
            value={this.state.query}
            className="shadow appearance-none border rounded w-full py-4 px-4 text-grey-darker"
            placeholder="Search"
          />
        </div>
        <Query query={employeesQuery} variables={{ query: this.state.query }}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading</p>;
            if (error) return <Error />;

            return (
              <div className="flex flex-wrap md:-mx-3">
                {data.employees.map(({ id, firstName, lastName }) => (
                  <Link
                    to={{
                      pathname: `/employees/${id}`,
                      search: window.location.search,
                    }}
                    className="px-3 w-full lg:w-1/2 no-underline text-black"
                    key={id}>
                    <div
                      className={`rounded shadow-md mb-6 bg-white hover:bg-purple hover:text-white ${
                        this.props.activeId === id ? 'active' : ''
                      }`}>
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
      </div>
    );
  }
}
