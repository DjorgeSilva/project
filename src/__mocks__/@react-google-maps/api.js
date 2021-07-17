import React from 'react'

export const map = {
  setZoom: jest.fn(),
  panTo: jest.fn()
}
export const GoogleMap = props => <mock-google-map {...props} />
export const Marker = props => <mock-marker {...props} />
export const useGoogleMap = jest.fn(() => map)
export const useLoadScript = jest.fn()
