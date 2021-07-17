// @flow

import { createContext } from 'react'
import createRootStore from '../stores/root'
import type { RootStoreType } from '../stores/root'

export const rootStore = createRootStore()

export default createContext<RootStoreType>(rootStore)
