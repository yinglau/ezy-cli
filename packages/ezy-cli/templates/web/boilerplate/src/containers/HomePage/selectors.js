import { createSelector } from 'reselect'

const selectHome = (state) => state.get('homePage')

export const getDefaultState = () => createSelector(
  selectHome,
  state => state.get('defaultState')
)
