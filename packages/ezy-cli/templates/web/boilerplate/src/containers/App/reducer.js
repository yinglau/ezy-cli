import { fromJS } from 'immutable'

export const GLOBAL_CHGTITLE = 'APP/GLOBAL_CHGTITLE'

export const initialState = fromJS({
  title: 'default title'
})

function globalReducer (state = initialState, action) {
  switch (action.type) {
    case GLOBAL_CHGTITLE:
      return state.set('title', action.title)
    default:
      return state
  }
}

export default globalReducer
