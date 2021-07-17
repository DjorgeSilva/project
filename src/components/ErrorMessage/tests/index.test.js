// @flow

import React from 'react'
import { shallow } from 'enzyme'
import ErrorMessage from '../'

describe('ErrorMessage', (): void => {
  describe('When mounted', (): void => {
    let wrapper

    beforeAll((): void => {
      wrapper = shallow(<ErrorMessage>Something went wrong</ErrorMessage>)
    })

    it('renders correctly', (): void => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
