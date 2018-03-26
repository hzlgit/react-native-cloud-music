import * as requestService from './request'

export function login (phone, password) {
  return requestService.get('login/cellphone', {
    phone: phone,
    password: password
  })
    .then((data) => {
      console.log(data)
      return data
    })
}

export function loginRefresh (phone, password) {
  return requestService.get('login/refresh')
    .then((data) => data)
}

export function getPlaylist (uid) {
  return requestService.get('user/playlist', {
    uid: uid
  })
    .then((data) => {
      if (data.code === 200) {
        return data.playlist
      }
      throw data
    })
}

export function getSubcount () {
  return requestService.get('user/subcount')
    .then((data) => {
      if (data.code === 200) {
        return data
      }
      throw data
    })
}
