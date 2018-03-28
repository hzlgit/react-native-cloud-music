import * as requestService from './request'

export function getPlaylistDetail (id) {
  return requestService.get('playlist/detail', {id: id}).then((data) => {
    if (data.code === 200) {
      return data.result
    }
    throw data
  })
}
