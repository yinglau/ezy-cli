import { fromJS } from 'immutable'
import {
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAIL
} from './actions'

const initialState = fromJS({
  homeNews: {
    isRequest: false,
    error: null,
    data: []
  }
})

function homeReducer (state = initialState, action) {
  switch (action.type) {
    case GET_NEWS:
      return state
        .setIn(['homeNews', 'isRequest'], true)
    case GET_NEWS_SUCCESS:
      return state
        .setIn(['homeNews', 'isRequest'], false)
        .setIn(['homeNews', 'data'], action.data)
    case GET_NEWS_FAIL:
      return state
        .setIn(['homeNews', 'isRequest'], false)
        .setIn(['homeNews', 'error'], action.error)
    default:
      return state
  }
}

export default homeReducer
