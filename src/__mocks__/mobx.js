export const observable = require.requireActual('mobx').observable
export const autorun = jest.fn()
export const action = require.requireActual('mobx').action
export const spy = jest.fn() // needed for mobx-react-lite check
export const configure = jest.fn() // needed for mobx-react-lite check
export const toJS = jest.fn(x => x) // needed for mobx-react-lite check
