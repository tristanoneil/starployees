import ApolloClient from 'apollo-boost';
import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import Employees from './Employees';

const client = new ApolloClient({
  uri: 'https://us1.prisma.sh/tristan-oneil-3cfa5c/starployees/dev',
});

export default class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <div className="container mx-auto">
          <header className="my-8 text-center md:text-left">
            <h1 className="font-light">
              <span role="img" aria-label="Star" className="pr-3">
                ✨
              </span>
              Star<span className="text-grey-dark">ployees</span>
            </h1>
          </header>
          <Employees />
        </div>
      </ApolloProvider>
    );
  }
}
