// @flow

import React from 'react'
import { mount } from 'enzyme'
// $FlowFixMe
import { hide as hideSplashScreen } from '@atomos/atomizer-utils/hooks/useSplashScreen'
// $FlowFixMe
import { get as getFromStorage } from '@atomos/atomizer-utils/hooks/useStorage'
// $FlowFixMe
import { show as showToast } from '@atomos/atomizer-utils/hooks/useToast'
// $FlowFixMe
import { requestPermission as requestLocalNotificationPermission } from '@atomos/atomizer-utils/hooks/useLocalNotifications'
// $FlowFixMe
import mockUseDevicePlatform from '@atomos/atomizer-utils/hooks/useDevicePlatform'
import { useRouteMatch, matchPath } from 'react-router-dom'
import App from '../App'
import mockUseRootStore from '../hooks/useRootStore'

jest.mock('react-router-dom')
jest.mock('@atomos/atomizer-utils/hooks/useSplashScreen')
jest.mock('@atomos/atomizer-utils/hooks/useStorage')
jest.mock('@atomos/atomizer-utils/hooks/usePushNotificationRegisteredStatus')
jest.mock('@atomos/atomizer-utils/hooks/useToast')
jest.mock('@atomos/atomizer-utils/hooks/useDevicePlatform')
jest.mock('@atomos/atomizer-utils/hooks/useLocalNotifications')

jest.mock('../components/ErrorBoundary', () => ({
  __esModule: true,
  default: (props: any) => (
    <mock-errorboundary>{props.children}</mock-errorboundary>
  )
}))
jest.mock('../components/MainContent', () => ({
  __esModule: true,
  default: (props: any) => <mock-maincontent>{props.children}</mock-maincontent>
}))
jest.mock('../components/Sidebar', () => ({
  __esModule: true,
  default: props => <mock-Sidebar />
}))
jest.mock('../components/NowPlayingBar', () => ({
  __esModule: true,
  default: props => <mock-NowPlayingBar />
}))
jest.mock('../components/LocalNotificationsRequestPopup', () => ({
  __esModule: true,
  default: props => <mock-LocalNotificationsRequestPopup />
}))

jest.mock('../views/error', () => ({
  __esModule: true,
  default: props => <mock-error />
}))
jest.mock('../views/login', () => ({
  __esModule: true,
  default: props => <mock-login />
}))
// jest.mock('../history')

jest.mock('../components/DraggableArea', () => ({
  __esModule: true,
  default: props => <mock-DraggableArea />
}))
jest.mock('../components/MobileMenu', () => ({
  __esModule: true,
  default: props => <mock-MobileMenu />
}))
jest.mock('../components/Header', () => ({
  __esModule: true,
  default: props => <mock-Header />
}))
jest.mock('../components/NowPlayingSongPlayer', () => ({
  __esModule: true,
  default: props => <mock-NowPlayingSongPlayer />
}))
jest.mock('../hooks/useRootStore')

describe('App', (): void => {
  describe('When mounted (not login)', (): void => {
    let wrapper
    const setCurrentRouteName = jest.fn()
    const setAvatarUrl = jest.fn()

    beforeAll((): void => {
      ;(mockUseDevicePlatform: any).mockImplementation(() => 'mobile')
      ;(mockUseRootStore: any).mockImplementation(() => ({
        setCurrentRouteName,
        setAvatarUrl
      }))
      ;(useRouteMatch: any).mockReturnValue(false)
      ;(getFromStorage: any).mockImplementation(() =>
        Promise.resolve({ value: 'http://avatar.jpg' })
      )
      ;(matchPath: any).mockImplementation((pathname, path) => {
        if (path === '/') {
          return {
            isExact: true
          }
        }
        return false
      })

      wrapper = mount(<App>My app</App>)
    })

    it('renders correctly', (): void => {
      expect(wrapper).toMatchSnapshot()
    })

    it('hides the splash screen', (): void => {
      expect(hideSplashScreen).toHaveBeenCalled()
    })

    it('retrieves avatar URL from storage and stores it', (): void => {
      expect(getFromStorage).toHaveBeenCalledWith({ key: 'avatar-url' })
      expect(setAvatarUrl).toHaveBeenCalledWith('http://avatar.jpg')
    })

    it('shows toast that we registered for push notifications', (): void => {
      expect(showToast).toHaveBeenCalledWith({
        text: 'You are registered for push notifications'
      })
    })

    it('requests local notifications permission', (): void => {
      expect(requestLocalNotificationPermission).toHaveBeenCalled()
    })

    it('sets the current route in name in the store', (): void => {
      expect(setCurrentRouteName).toHaveBeenCalledWith('home')
    })

    describe('and we navigate to login', (): void => {
      beforeAll((): void => {
        useRouteMatch.mockReturnValue(true)
        wrapper.setProps({})
      })

      it('renders correctly', (): void => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
