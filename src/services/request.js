import qs from 'query-string'
import config from '../configs'
import {AsyncStorage} from 'react-native'

const urlPrefix = config.domain + config.apiPath
const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

function filterJSON (res) {
  return res.json()
}

function filterStatus (res) {
  console.log('result', res)
  if (res.status >= 200 && res.status < 300) {
    let cookie = res.headers.map['set-cookie']
    if (cookie) {
      AsyncStorage.setItem('cookie', JSON.stringify(cookie))
    }
    return res
  } else {
    let error = new Error(res.statusText)
    error.res = res
    error.type = 'http'
    throw error
  }
}

export async function get (url, params) {
  url = urlPrefix + url
  if (params) {
    url += `?${qs.stringify(params)}`
  }

  if (isDebuggingInChrome) {
    console.info('GET: ', url)
    console.info('Params: ', params)
  }
  return fetch(url, {
    headers: {
      cookie: await AsyncStorage.getItem('cookie')
    }
  })
    .then(filterStatus)
    .then(filterJSON)
}

export async function post (url, body) {
  url = urlPrefix + url

  if (isDebuggingInChrome) {
    console.info('POST: ', url)
    console.info('Body: ', body)
  }

  return fetch(url, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'cookie': await AsyncStorage.getItem('cookie')
    },
    body: JSON.stringify(body)
  })
    .then(filterStatus)
    .then(filterJSON)
}
