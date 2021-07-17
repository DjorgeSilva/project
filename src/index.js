//  @flow

import React, { Suspense } from 'react'
import ReactDOM from 'react-dom'
import 'typeface-roboto'
import { Route, Switch, Router } from 'react-router-dom'

import history from './history'
import routes from './routes'
import App from './App'
import ErrorView from './views/error'

const rootElem = document.getElementById('root')

if (rootElem !== null) {
  ReactDOM.render(
    <Suspense fallback="Loading the content...">
      <Router history={history}>
        <App>
          <Switch>
            {routes.map(
              // prettier-ignore
              ({ path, name }): React$Element<*> => (
                  <Route
                    key={path}
                    path={path}
										// $FlowFixMe - Flow doesn't like this require statement but we like dynamic routing
                    component={require(`./views/${name}`).default} // eslint-disable-line
                    exact={true}
                  />
                )
            )}
            <Route component={ErrorView} />
          </Switch>
        </App>
      </Router>
    </Suspense>,
    rootElem
  )
}
