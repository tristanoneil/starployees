# ✨ Starployees

Oh hai, I didn't see you come in. Welcome. Starployees is an employee directory
for employees of the stars (insert magical hand wave gesture here). It's built
with [React](https://reactjs.org) and [Apollo](https://www.apollographql.com)
on the frontend and powered by [Prisma](https://www.prisma.io) on the backend.

A working production build can be found here:
http://starployees.s3-website-us-east-1.amazonaws.com

## Getting Started

The frontend build process is all managed by
[create-react-app](https://github.com/facebook/create-react-app) to get
started:

1. `yarn install`
1. `yarn start`

Upon running `yarn start` a browser window pointed at http://localhost:3000
should open.

Tests are written using [Enzyme](https://github.com/airbnb/enzyme) and
[Jest](https://facebook.github.io/jest). You can run all of the tests and watch
for any changes by running `yarn test`.

The backend as mentioned uses Prisma (specifically the hosted Prisma demo
server). The schema is defined in `datamodel.graphql`. If any changes are made
to this schema it can be updated on the demo server w/ `prisma deploy`.

There is some seed data provided in `seed.graphql` the demo server can be
seeded by running `prisma seed`. If you wish to also reset the database before
seeding you may run `prisma reset`.

[TailWind CSS](https://tailwindcss.com) is used for styling purposes, it's
built with PostCSS. Since create-react-app doesn't support custom PostCSS
configs a PostCSS process is run side-by side to build Tailwind with the
create-react-app dev server.
