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
        <Employees />
      </ApolloProvider>
    );
  }
}
