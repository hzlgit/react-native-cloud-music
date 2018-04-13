import * as types from '../constants/ActionTypes'

const initialState = {
  list: [],
  playingMusic: null // 当前播放音乐
}
function indexOf (id, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) {
      return i
    }
  }
  return -1
}
function remove (id, arr) {
  let index = arr.indexOf(id)
  let result = arr.concat([])
  if (index > -1) {
    result.splice(index, 1)
  }
  return result
}
function formatMusic (list) {
  let arr = []
  list.map(m => {
    arr.push({
      ...m,
      musicUrl: 'http://music.163.com/song/media/outer/url?id=' + m.id + '.mp3'
    })
  })
  return arr
}

export default function (state = initialState, action) {
  const {payload, error, meta = {}, type} = action
  const {sequence = {}} = meta
  if (sequence.type === 'start' || error) {
    return state
  }
  switch (type) {
    case types.ADD_MUSIC_TO_LIST:
      return {
        ...state,
        list: state.list.concat(formatMusic(payload.musics))
      }
    case types.PLAY_MUSIC:
      return {
        ...state,
        playingMusic: payload && payload.music
      }
    case types.REMOVE_MUSIC:
      return {
        ...state,
        list: remove(payload.music.id, state.list)
      }
    case types.REMOVE_ALL_MUSIC:
      return {
        ...state,
        list: []
      }
    default:
      return state
  }
}
