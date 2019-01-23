import React from 'react'
import { shallow } from 'enzyme'

import Header from './index'

describe('Header', () => {
  it('include 2 div', () => {
    const component = shallow(<Header />)
    expect(component.find('div')).toHaveLength(2)
  })
  it('include 2 span', () => {
    const component = shallow(<Header />)
    expect(component.find('span')).toHaveLength(2)
  })
})
