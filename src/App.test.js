import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

let component;

beforeEach(() => {
  component = shallow(<App />);
});

it('renders a header', () => {
  expect(component.find('header').length).toEqual(1);
  expect(component.html()).toMatch(/Star.*ployees/);
});

it('renders a BrowserRouter', () => {
  expect(component.find('BrowserRouter').length).toEqual(1);
});

it('renders an ApolloProvider', () => {
  expect(component.find('ApolloProvider').length).toEqual(1);
});
