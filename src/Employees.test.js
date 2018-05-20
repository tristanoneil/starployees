import Employees, { employeesQuery } from './Employees';
import React from 'react';
import gql from 'graphql-tag';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { waitForApollo } from './testHelpers';

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

  const component = await waitForApollo(
    mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Employees />
        </MemoryRouter>
      </MockedProvider>,
    ),
  );

  expect(component.text()).toMatch('First Last');
});
