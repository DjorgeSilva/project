// @flow

import { observable } from 'mobx'
import { isElectronApp } from '../utils/misc'
import { syncStore } from '../utils/stores'

export type RootStoreType = {
  version: string,
  task: Array<any>,
  loadAllTasks: ()=> Array<any>
}

export default () => {
  const store = observable({
    version: '1.0',
    tasks: [],

    loadAllTasks (): Array<any>{
      console.log('View called loadAllTasks')
      return []
    }
  },
  // mobx - effects
    {}
  )

  if (isElectronApp()) {
    syncStore('root', store)
  }

  return store
}
