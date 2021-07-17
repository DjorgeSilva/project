export const getPhoto = jest.fn(() => ({
  webPath: 'http://getPhoto-result.jpg'
}))

export default () => ({ getPhoto })
