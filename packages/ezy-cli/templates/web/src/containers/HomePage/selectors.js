import { createSelector } from 'reselect'

const selectHome = (state) => state.get('homePage')

export const selectHomeNews = () => createSelector(
  selectHome,
  state => state.get('homeNews').toJS()
)
