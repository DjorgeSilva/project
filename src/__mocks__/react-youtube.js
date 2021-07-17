import React from 'react'

export const player = {
  setVolume: jest.fn(),
  seekTo: jest.fn(),
  playVideo: jest.fn(),
  pauseVideo: jest.fn(),
  getDuration: jest.fn(),
  getCurrentTime: jest.fn(() => 400)
}

let isReady = false

export default props => {
  if (!isReady) {
    isReady = true
    props.onReady({
      target: player
    })
  }
  return <mock-youtube {...props} />
}
