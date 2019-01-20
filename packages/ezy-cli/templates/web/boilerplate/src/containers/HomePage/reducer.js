import { fromJS } from 'immutable'
import {
  DEFAULT
} from './actions'

const initialState = fromJS({
  defaultState: 'default state'
})

function homeReducer (state = initialState, action) {
  switch (action.type) {
    case DEFAULT:
      return state.set('defaultState', action.val)
    default:
      return state
  }
}

export default homeReducer
