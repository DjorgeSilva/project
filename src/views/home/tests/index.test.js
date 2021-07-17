// @flow

import React from 'react'
import { shallow } from 'enzyme'
import Home from '../'

describe('Home', (): void => {
  describe('When mounted', (): void => {
    let wrapper

    beforeAll((): void => {
      wrapper = shallow(<Home />)
    })

    it('renders correctly', (): void => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
