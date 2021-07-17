// @flow

function getIsDesktop(): boolean {
  return window.navigator.userAgent.includes('Electron')
}

function getIsMobile(): boolean {
  return !!window.Capacitor
}

export const platforms = {
  desktop: 'desktop',
  mobile: 'mobile',
  web: 'web'
}

export default () => {
  if (getIsDesktop()) {
    return platforms.desktop
  }

  if (getIsMobile()) {
    return platforms.mobile
  }

  return platforms.web
}
