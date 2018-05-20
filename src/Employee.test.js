import Employee, { employeeQuery } from './Employee';
import React from 'react';
import gql from 'graphql-tag';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { waitForApollo } from './testHelpers';

it('renders an employee for a given id', async () => {
  const mocks = [
    {
      request: { query: employeeQuery, variables: { id: 'id' } },
      result: {
        data: {
          employee: {
            __typename: 'Employee',
            firstName: 'First',
            id: 'id',
            lastName: 'Last',
            phoneNumber: '802-000-0000',
            email: 'first@example.com',
            bio: 'Bio',
          },
        },
      },
    },
  ];

  const component = await waitForApollo(
    mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Employee match={{ params: { id: 'id' } }} />
        </MemoryRouter>
      </MockedProvider>,
    ),
  );

  expect(component.text()).toMatch('First Last');
});
