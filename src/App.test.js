import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

it('renders', () => {
  const component = shallow(<App />);
  expect(component.text()).toMatch('Under Construction');
});
