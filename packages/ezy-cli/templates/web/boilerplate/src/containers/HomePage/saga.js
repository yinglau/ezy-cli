import { takeEvery } from 'redux-saga/effects'
import {
  DEFAULT
} from './actions'

function * defaultFlow (action) {
  try {
    yield () => {}
    console.log('run saga action.type', action.type)
  } catch (e) {
    console.log('run saga error')
  }
}

export default function * saga () {
  yield takeEvery(DEFAULT, defaultFlow)
}
