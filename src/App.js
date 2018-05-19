import React, { Component } from 'react';

export default class App extends Component {
  render() {
    return (
      <h1>
        <marquee>
          <span role="img" aria-label="Construction Worker">
            👷
          </span>
          &nbsp;Under Construction
        </marquee>
      </h1>
    );
  }
}
