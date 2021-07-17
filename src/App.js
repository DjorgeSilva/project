//  @flow

/* eslint-disable import/no-duplicates */
import React from 'react'

import ErrorBoundary from './components/ErrorBoundary'
import RootStoreContext, { rootStore } from './contexts/RootStore'

import './global.css'

type AppPropType = {
  children: any
}

const App = function(props: AppPropType): React$Element<*> {
  return (
    <RootStoreContext.Provider value={rootStore}>
      <ErrorBoundary>{props.children}</ErrorBoundary>
    </RootStoreContext.Provider>
  )
}

export default App
