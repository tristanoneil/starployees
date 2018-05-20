import Employee, { employeeQuery } from './Employee';
import React from 'react';
import gql from 'graphql-tag';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

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
          },
        },
      },
    },
  ];

  const component = mount(
    <MockedProvider mocks={mocks}>
      <MemoryRouter>
        <Employee match={{ params: { id: 'id' } }} />
      </MemoryRouter>
    </MockedProvider>,
  );

  // need to wait a tick then re-render in order to render the mocked data
  // otherwise apollo thinks it's still loading
  await new Promise(resolve => setTimeout(resolve));
  component.update();

  expect(component.text()).toMatch('First Last');
});
