import Employees, { employeesQuery } from './Employees';
import React from 'react';
import gql from 'graphql-tag';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

it('renders employees', async () => {
  const mocks = [
    {
      request: { query: employeesQuery },
      result: {
        data: {
          employees: [
            {
              __typename: 'Employee',
              firstName: 'First',
              id: 'id',
              lastName: 'Last',
            },
          ],
        },
      },
    },
  ];

  const component = mount(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <Employees />
      </MemoryRouter>
    </MockedProvider>,
  );

  // need to wait a tick then re-render in order to render the mocked data
  // otherwise apollo thinks it's still loading
  await new Promise(resolve => setTimeout(resolve));
  component.update();

  expect(component.text()).toMatch('First Last');
});
