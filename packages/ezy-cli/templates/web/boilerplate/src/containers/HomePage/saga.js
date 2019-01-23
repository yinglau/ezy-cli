import { takeEvery, call, put } from 'redux-saga/effects'
import * as api from '../../services'
import {
  GET_NEWS,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAIL
} from './actions'

function* defaultFlow (action) {
  try {
    console.log('run saga action.type', action.type)
    const data = yield call(api.getNews, action.payload)
    yield put({ type: GET_NEWS_SUCCESS, data: data.data })
    console.log('run saga action.type', GET_NEWS_SUCCESS)
  } catch (error) {
    yield put({ type: GET_NEWS_FAIL, error })
    console.log('run saga error')
  }
}

export default function* saga () {
  yield takeEvery(GET_NEWS, defaultFlow)
}
