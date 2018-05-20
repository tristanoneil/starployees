import React from 'react';
import App from './App';
import { shallow } from 'enzyme';

it('renders Employees', () => {
  const component = shallow(<App />);
  expect(component.find('Employees').length).toEqual(1);
});
