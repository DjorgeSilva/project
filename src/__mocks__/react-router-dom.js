import React from 'react'

export const Link = ({ children }) => <mock-link>{children}</mock-link>
export const Switch = ({ children }) => <mock-switch>{children}</mock-switch>
export const Route = props => <mock-route {...props} />
export const Router = ({ children }) => <mock-router>{children}</mock-router>
export const useParams = jest.fn(() => ({}))
export const useRouteMatch = jest.fn(() => ({}))
export const useLocation = jest.fn(() => ({}))
export const matchPath = jest.fn((pathname, path) => ({ isExact: true }))
