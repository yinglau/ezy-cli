import "@babel/polyfill"
import React from 'react'
import { shallow } from 'enzyme'

import App from '../'
import Header from '../../../components/Header'

describe('App Container', () => {
  it('include 1 <Header />', () => {
    const wrapper = shallow(<App />)
    expect(wrapper.find(Header)).toHaveLength(1)
  })
})
