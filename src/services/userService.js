import * as requestService from './request'

export function login (phone,password) {
  return requestService.get('login/cellphone',{
          phone:phone,
          password:password
    })
		.then((data) => {
      return data
    })
}

export function loginRefresh (phone,password) {
  return requestService.get('login/refresh')
		.then((data) => {
      return data
    })
}

export function getPlaylist (uid) {
  return requestService.get('user/playlist',{
      uid:uid
    })
		.then((data) => {
      return data
    })
}

