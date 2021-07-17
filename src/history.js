// @flow

import { createHashHistory, createBrowserHistory } from 'history'
import { isElectronApp } from './utils/misc'

export default isElectronApp() ? createHashHistory() : createBrowserHistory()
