import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://cnodejs.org/api/v1',
  timeout: 10000,
  headers: {}
})

export const get = (path, data) => {
  return instance.get(path, {
    params: data || {}
  }).then(res => res.data)
}

export const post = (path, data) => {
  return instance.post(path, data || {})
    .then(res => res.data)
}
