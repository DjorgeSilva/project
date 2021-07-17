// @flow

import React from 'react'
import { shallow } from 'enzyme'
import Error from '../'

describe('Error', (): void => {
  describe('When mounted', (): void => {
    let wrapper

    beforeAll((): void => {
      wrapper = shallow(<Error />)
    })

    it('renders correctly', (): void => {
      expect(wrapper).toMatchSnapshot()
    })
  })
})
