import React from 'react'
import Header from '../index'
import { shallow } from 'enzyme'

describe('an example test suit', () => {
  it('an example test', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper.find('div').text()).toEqual('header')
  })
})

