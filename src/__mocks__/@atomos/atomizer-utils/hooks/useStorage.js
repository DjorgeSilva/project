export const set = jest.fn()
export const get = jest.fn(() => ({ value: undefined }))

export default () => ({ set, get })
