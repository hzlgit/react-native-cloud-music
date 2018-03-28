import {createAction} from 'redux-actions'
import * as types from '../constants/ActionTypes'

// 播放状态
export const changePlayStatus = createAction(
  types.CHANGE_PLAY_STATUS,
  (music, status) => {
    return {
      music,
      status
    }
  }
)
// 播放模式
export const changePlayMode = createAction(
  types.CHANGE_PLAY_MODE,
  (mode) => {
    return {
      mode
    }
  }
)
