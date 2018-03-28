import {createAction} from 'redux-actions'
import * as types from '../constants/ActionTypes'
import * as musicService from '../services/musicService'

// 添加音乐到播放列表
export const getPlaylistDetail = createAction(
  types.GET_PLAYLIST_DETAIL,
  musicService.getPlaylistDetail,
  (id, resolved, rejected) => {
    return {
      resolved,
      rejected
    }
  }
)
// 添加音乐到播放列表
export const addMusicToList = createAction(
  types.ADD_MUSIC_TO_LIST,
  (music) => {
    return {
      music
    }
  }
)
// 删除播放列表里面的音乐
export const removeMusic = createAction(
  types.REMOVE_MUSIC,
  (musics) => {
    return {
      musics
    }
  }
)
