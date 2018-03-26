import * as requestService from './request'

export function getBanner () {
  return requestService.get('banner').then((data) => data)
}

export function getPersonalized () {
  return requestService.get('personalized').then((data) => data)
}
