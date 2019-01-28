import globalReducer, { GLOBAL_CHGTITLE, initialState } from '../reducer'
import { fromJS } from 'immutable'

describe('test App reducer', () => {
  it('should return initialState', () => {
    expect(globalReducer(undefined, {})).toEqual(initialState)
  })

  it('state.title should equal `myname`', () => {
    const state = fromJS({
      title: 'myname'
    })
    expect(globalReducer(undefined, {type: GLOBAL_CHGTITLE, title: 'myname'})).toEqual(state)
  })
})
