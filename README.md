# example-app-reviewnotes

An application for a code test with a Vue2 frontend, and Express.js REST API
Some things are missing, because of prioritation.

- Showing assingees, reporters with images.
  - We already have the base64 image, so it's a matter of loading
- Debounce API calls
  - It's currently making calls for every filter change, would add some ms delay
- Dropdowns for filtering on assignee/reporter don't show names
- Dates are ugly. Would use moment.js to format them
- Link buttons are missing

In this test, I prioritized using good practices for implementation, rather than focus on details.
The dummy data appears to come from mongodb, which would make the data structure ideal to filter using mongo, but not perhaps not optimal for this implementation.

The app also uses typescript with ESLint validation with my custom ruleset

**Both API and frontend must be running**

Frontend url: `localhost:8080/engagements/1234/reviewnotes`

## API

### Setup

`cd api` to enter api folder

`yarn install` to install deps

`yarn run start:dev` to start dev server on port 3000 with nodemon

#### For production

`yarn run build` to run tsc (typescript compilation)

`yarn run start:prod` to start dev server on port 3000 (with plain `node`, not nodemon)

## Client / frontend

`cd client` to enter api folder

### Project setup

```
yarn install
```

#### Compiles and hot-reloads for development

```
yarn serve
```

#### Compiles and minifies for production

```
yarn build
```

#### Lints and fixes files

```
yarn lint
```
