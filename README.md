<h1 style="font-weight:500">
  <a href="https://acquity.netlify.com">
    <img src=https://raw.githubusercontent.com/acquity/web/master/public/apple-touch-icon.png alt="acquity" width=40>
  </a>
  &nbsp;acquity&nbsp;
</h1>

[![Netlify Status](https://api.netlify.com/api/v1/badges/5226f9ce-01c6-4617-80b2-6ca0b796ccbd/deploy-status)](https://app.netlify.com/sites/acquity/deploys)

A marketplace to buy and sell stocks from private companies or startups. Acquity equity.
<br>

> This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Table of contents
   * [Get started](#get-started)
   * [Project structure](#project-structure)
       * [Rules when creating a new React component](#rules-when-creating-a-new-react-component)
   * [React hooks exposed by the app](#react-hooks-exposed-by-the-app)
       * [useAuth](#useauth)
       * [useUser](#useuser)

## Get started
In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Project structure
The current project structure and its important directories are shown below:

```
acquity
└─public/
└─src/
  │ index.js    
  │ serviceWorker.js
  └─app/
  └─assets/
  └─components/
  └─contexts/
  └─routes/
  └─services/
  └─utils/
```
### Rules when creating a new React component
This project creates a new folder for each component in its most sensible parent directory. 

* For example, a component such as the `Navbar` that is used by multiple other components can exist in the `components/` folder. 
* Subcomponents that make up a single component should be grouped in the same folder.
    * E.g. `LoginForm.jsx` should be grouped with `Login.jsx` in the `login/` folder.
* A component that is only used by a single other component should exist in a subfolder of the parent component.
    * E.g. the `auth/login/`, `auth/signup/`, `auth/forgot-password/` folders.

* Components wrapped by React Router's `<Route>` object should be contained in the `routes/` folder.

 A typical component folder should look like this:
 
```
component
│ Component.jsx  # A stateless/function component
│ Component.scss  # The styles for the component with the same name
| ComponentContainer.jsx  # The stateful component for the stateless component it contains
| ComponentDux.js  # The component returned after connecting to redux store
| index.js  # A single line file that exports the top level component for use.
 ```
 Grouping the components this way allows for easy refactoring of components without having to change all imports for other components that uses the refactored component, since one just needs to update the exported component in `index.js`.
 
> The bare minimum that a component folder should contain is `Component.jsx` and `index.js`. The rest are optional.

### `app/` directory
Contains:

* `App.js`, the entry point of the application.
* `rootReducer.js`, for Redux store.

### `routes/` directory
Contains folders containing components that are wrapped by React Router's `<Route>` in `src/app/AuthenticatedApp` or `src/app/UnauthenticatedApp`.

### `components/` directory
Contains components that are used by more than 1 (or 2) components.

### `contexts/` directory
Contains contexts providing React hooks and providers that can be used by React components. See [React Context](https://reactjs.org/docs/context.html) for more details on how to use them.

### `services` and `utils` directory
Self explanatory. 
> Might be merged together in the future.


## React hooks exposed by the app
### useAuth
```
import { useAuth } from 'contexts/authContext';
```
Contains:

* `data`: The current user logged in
* `login(form: {email: string, password: string})`: used to log in with the given form.
* `register(form: {email: string, password: string, fullName: string})`: used to register with the given form.
* `logout()`: log out of the application

#### Usage
```
const { logout } = useAuth()

<Button onClick={logout} />
``` 


### useUser
```
import { useUser } from 'contexts/userContext';
```

#### Usage
```
// App.js
const App = () => {
  const user = useUser();

  return user 
      ? <AuthenticatedApp /> 
      : <UnauthenticatedApp />
};
```
