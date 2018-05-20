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
      request: { query: employeesQuery, variables: { query: '' } },
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

describe('searching', () => {
  let component, pushHistorySpy;

  beforeEach(async () => {
    const mocks = [
      {
        request: { query: employeesQuery, variables: { query: 'Search' } },
        result: {
          data: {
            employees: [
              {
                __typename: 'Employee',
                firstName: 'Search',
                id: 'id',
                lastName: 'Query',
              },
            ],
          },
        },
      },
    ];

    pushHistorySpy = jest.fn();

    component = mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Employees history={{ push: pushHistorySpy }} />
        </MemoryRouter>
      </MockedProvider>,
    );

    component
      .find('input[type="search"]')
      .simulate('change', { target: { value: 'Search' } });

    await waitForApollo(component);
  });

  it('renders the queried employee', () => {
    expect(component.text()).toMatch('Search Query');
  });

  it('updates the browser history with the query', () => {
    expect(pushHistorySpy).toHaveBeenCalledWith({
      search: '?query=Search',
    });
  });
});
