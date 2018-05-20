import Employees, { employeesQuery } from './Employees';
import React from 'react';
import gql from 'graphql-tag';
import { MemoryRouter } from 'react-router-dom';
import { MockedProvider } from 'react-apollo/test-utils';
import { mount } from 'enzyme';
import { waitForApollo } from './testHelpers';

let component;

beforeEach(async () => {
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
            {
              __typename: 'Employee',
              firstName: 'Active',
              id: 'active',
              lastName: 'Employee',
            },
          ],
        },
      },
    },
  ];

  component = await waitForApollo(
    mount(
      <MockedProvider mocks={mocks}>
        <MemoryRouter>
          <Employees activeId="active" />
        </MemoryRouter>
      </MockedProvider>,
    ),
  );
});

it('renders employees', async () => {
  expect(component.text()).toMatch('First Last');
});

it('adds an active class when an employee id matches an activeId prop', () => {
  expect(component.find('.active').text()).toMatch('Active Employee');
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
