import ApolloClient from 'apollo-boost';
import Employee from './Employee';
import Employees from './Employees';
import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/tristan-oneil-3cfa5c/starployees/dev',
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container mx-auto">
          <Router>
            <Fragment>
              <header className="my-8 text-center md:text-left">
                <Link to="/" className="no-underline text-black">
                  <h1 className="font-light">
                    <span role="img" aria-label="Star" className="pr-3">
                      ✨
                    </span>
                    Star<span className="text-grey-dark">ployees</span>
                  </h1>
                </Link>
              </header>
              <Route exact path="/" component={Employees} />
              <Route path="/employees/:id" component={Employee} />
            </Fragment>
          </Router>
        </div>
      </ApolloProvider>
    );
  }
}
