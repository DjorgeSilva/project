// @flow

import React from 'react'
import { mount } from 'enzyme'
import ErrorBoundary from '../'

jest.mock('@atomos/atomizer-utils/hooks/useTranslation')

describe('ErrorBoundary', (): void => {
  describe('When mounted', (): void => {
    let wrapper

    beforeAll((): void => {
      wrapper = mount(<ErrorBoundary>Some child</ErrorBoundary>)
    })

    it('renders correctly', (): void => {
      expect(wrapper).toMatchSnapshot()
    })

    describe('then it errors', (): void => {
      beforeAll((): void => {
        wrapper.setState({ hasError: true })
      })

      it('renders correctly', (): void => {
        expect(wrapper).toMatchSnapshot()
      })
    })
  })
})
